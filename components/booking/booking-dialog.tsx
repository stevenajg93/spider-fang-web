"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, User, Target } from "lucide-react"
import { createConsultationEvent, getAvailableSlots } from "@/lib/adapters/calendar-adapter"
import { useToast } from "@/hooks/use-toast"
import { WORKING_HOURS } from "@/lib/config"

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  goals: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const budgetOptions = [
  { value: "500-1500", label: "£500 - £1,500" },
  { value: "1500-3000", label: "£1,500 - £3,000" },
  { value: "3000-5000", label: "£3,000 - £5,000" },
  { value: "5000+", label: "£5,000+" },
  { value: "not-sure", label: "Not sure yet" },
]

const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1-month", label: "Within 1 month" },
  { value: "2-3-months", label: "2-3 months" },
  { value: "3-6-months", label: "3-6 months" },
  { value: "6-months+", label: "6+ months" },
]

const serviceOptions = [
  { value: "strategy", label: "Digital Strategy" },
  { value: "design", label: "Web Design" },
  { value: "development", label: "Development" },
  { value: "optimization", label: "Conversion Optimization" },
  { value: "maintenance", label: "Ongoing Support" },
]

export function BookingDialog({ open, onOpenChange }: BookingDialogProps) {
  const [step, setStep] = useState<"form" | "slots" | "success">("form")
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [selectedSlot, setSelectedSlot] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [bookingResult, setBookingResult] = useState<{ meetLink: string; htmlLink: string } | null>(null)
  const { toast } = useToast()

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      services: [],
    },
  })

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true)
    try {
      if (selectedSlot) {
        // Create calendar event if slot is selected
        const [date, time] = selectedSlot.split("T")
        const startDateTime = new Date(`${date}T${time}:00`)
        const endDateTime = new Date(startDateTime.getTime() + 30 * 60000) // 30 minutes later

        const result = await createConsultationEvent({
          name: data.name,
          email: data.email,
          start: startDateTime.toISOString(),
          end: endDateTime.toISOString(),
          timezone: WORKING_HOURS.timezone,
          notes: `Budget: ${data.budget}, Timeline: ${data.timeline}, Services: ${data.services.join(", ")}, Goals: ${data.goals || "Not specified"}`,
          company: data.company,
        })

        setBookingResult(result)
        setStep("success")
      } else {
        // Just save the lead without booking a specific slot
        toast({
          title: "Consultation Request Received",
          description: "We'll contact you within 24 hours to schedule your consultation.",
        })
        onOpenChange(false)
      }

      // Save lead to localStorage (in production, this would go to a database)
      const leads = JSON.parse(localStorage.getItem("consultation-leads") || "[]")
      leads.push({
        ...data,
        timestamp: new Date().toISOString(),
        slot: selectedSlot || null,
      })
      localStorage.setItem("consultation-leads", JSON.stringify(leads))
    } catch (error) {
      console.error("Booking error:", error)
      toast({
        title: "Booking Error",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleServiceChange = (serviceValue: string, checked: boolean) => {
    const currentServices = form.getValues("services")
    if (checked) {
      form.setValue("services", [...currentServices, serviceValue])
    } else {
      form.setValue(
        "services",
        currentServices.filter((s) => s !== serviceValue),
      )
    }
  }

  const loadAvailableSlots = async (date: string) => {
    try {
      const slots = await getAvailableSlots(date)
      setAvailableSlots(slots)
    } catch (error) {
      console.error("Error loading slots:", error)
      setAvailableSlots([])
    }
  }

  const handleDateChange = (date: string) => {
    form.setValue("preferredDate", date)
    if (date) {
      loadAvailableSlots(date)
    }
  }

  const proceedToSlots = () => {
    const date = form.getValues("preferredDate")
    if (date) {
      loadAvailableSlots(date)
    }
    setStep("slots")
  }

  const selectSlot = (date: string, time: string) => {
    const slotDateTime = `${date}T${time}`
    setSelectedSlot(slotDateTime)
    form.setValue("preferredTime", time)
  }

  const resetDialog = () => {
    setStep("form")
    setSelectedSlot("")
    setAvailableSlots([])
    setBookingResult(null)
    form.reset()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        onOpenChange(newOpen)
        if (!newOpen) {
          resetDialog()
        }
      }}
    >
      <DialogContent className="sm:max-w-[600px] bg-black border-red-900/20 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bebas text-2xl tracking-wide text-center">
            {step === "form" && "Book Your Free Consultation"}
            {step === "slots" && "Choose Your Time Slot"}
            {step === "success" && "Consultation Booked!"}
          </DialogTitle>
        </DialogHeader>

        {step === "form" && (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-red-400 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    className="bg-gray-900 border-gray-700 text-white"
                    placeholder="Your full name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className="bg-gray-900 border-gray-700 text-white"
                    placeholder="your@email.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    {...form.register("company")}
                    className="bg-gray-900 border-gray-700 text-white"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    {...form.register("phone")}
                    className="bg-gray-900 border-gray-700 text-white"
                    placeholder="Your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-red-400 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Project Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Budget Range *</Label>
                  <Select onValueChange={(value) => form.setValue("budget", value)}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      {budgetOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-white">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.budget && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.budget.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="timeline">Timeline *</Label>
                  <Select onValueChange={(value) => form.setValue("timeline", value)}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      {timelineOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-white">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.timeline && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.timeline.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label>Services Needed *</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {serviceOptions.map((service) => (
                    <div key={service.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={service.value}
                        onCheckedChange={(checked) => handleServiceChange(service.value, checked as boolean)}
                        className="border-gray-700"
                      />
                      <Label htmlFor={service.value} className="text-sm">
                        {service.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {form.formState.errors.services && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.services.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="goals">Project Goals & Notes</Label>
                <Textarea
                  id="goals"
                  {...form.register("goals")}
                  className="bg-gray-900 border-gray-700 text-white"
                  placeholder="Tell us about your project goals, challenges, or any specific requirements..."
                  rows={3}
                />
              </div>
            </div>

            {/* Optional Scheduling */}
            <div className="space-y-4">
              <h3 className="font-semibold text-red-400 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Consultation (Optional)
              </h3>
              <div>
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  {...form.register("preferredDate")}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold flex-1"
              >
                {isLoading ? "Submitting..." : "Submit Request"}
              </Button>
              {form.getValues("preferredDate") && (
                <Button
                  type="button"
                  onClick={proceedToSlots}
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                >
                  Choose Time Slot
                </Button>
              )}
            </div>
          </form>
        )}

        {step === "slots" && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-400">
                Available slots for {form.getValues("preferredDate")} ({WORKING_HOURS.timezone})
              </p>
            </div>

            {availableSlots.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedSlot.includes(time) ? "default" : "outline"}
                    className={
                      selectedSlot.includes(time)
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "border-gray-700 text-gray-300 hover:border-red-600 hover:text-red-400 bg-transparent"
                    }
                    onClick={() => selectSlot(form.getValues("preferredDate")!, time)}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {time}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No available slots for this date.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Please choose a different date or submit without scheduling.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setStep("form")}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:border-red-600 hover:text-red-400 bg-transparent"
              >
                Back to Form
              </Button>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading || !selectedSlot}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold flex-1"
              >
                {isLoading ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        )}

        {step === "success" && bookingResult && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Consultation Booked Successfully!</h3>
              <p className="text-gray-400">
                We've sent you a confirmation email with all the details. Looking forward to discussing your project!
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-center space-x-4">
                <Button
                  onClick={() => window.open(bookingResult.meetLink, "_blank")}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Join Meeting
                </Button>
                <Button
                  onClick={() => window.open(bookingResult.htmlLink, "_blank")}
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                >
                  Add to Calendar
                </Button>
              </div>
            </div>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:border-red-600 hover:text-red-400 bg-transparent"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
