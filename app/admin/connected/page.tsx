"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Users,
  Calendar,
  Package,
  MessageCircle,
  TrendingUp,
  Mail,
  Phone,
  Building,
  Clock,
  Search,
  Download,
  Trash2,
} from "lucide-react"
import { DEMO } from "@/lib/config"

interface Lead {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  budget: string
  timeline: string
  services: string[]
  goals?: string
  timestamp: string
  status: "new" | "contacted" | "qualified" | "converted"
  source: "consultation" | "chat" | "contact"
}

interface ConsultationBooking {
  id: string
  name: string
  email: string
  company?: string
  slot?: string
  timestamp: string
  status: "scheduled" | "completed" | "cancelled"
  meetLink?: string
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Load data from localStorage (in production, this would come from a database)
  useEffect(() => {
    const savedLeads = localStorage.getItem("consultation-leads")
    const savedConsultations = localStorage.getItem("consultation-bookings")

    if (savedLeads) {
      try {
        const parsedLeads = JSON.parse(savedLeads).map((lead: any, index: number) => ({
          ...lead,
          id: lead.id || `lead_${index}`,
          status: lead.status || "new",
          source: lead.source || "consultation",
        }))
        setLeads(parsedLeads)
      } catch (error) {
        console.error("Error loading leads:", error)
      }
    }

    if (savedConsultations) {
      try {
        const parsedConsultations = JSON.parse(savedConsultations).map((booking: any, index: number) => ({
          ...booking,
          id: booking.id || `booking_${index}`,
          status: booking.status || "scheduled",
        }))
        setConsultations(parsedConsultations)
      } catch (error) {
        console.error("Error loading consultations:", error)
      }
    }

    // Add some demo data if in demo mode and no data exists
    if (DEMO && leads.length === 0) {
      const demoLeads: Lead[] = [
        {
          id: "demo_1",
          name: "Sarah Johnson",
          email: "sarah@techstart.com",
          company: "TechStart Ltd",
          phone: "+44 7700 900123",
          budget: "1500-3000",
          timeline: "1-month",
          services: ["design", "development"],
          goals: "Need a modern website to showcase our SaaS product",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: "new",
          source: "consultation",
        },
        {
          id: "demo_2",
          name: "Michael Chen",
          email: "m.chen@growthcorp.co.uk",
          company: "GrowthCorp",
          budget: "3000-5000",
          timeline: "2-3-months",
          services: ["strategy", "design", "development", "optimization"],
          goals: "Complete website redesign with focus on conversion optimization",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          status: "contacted",
          source: "chat",
        },
        {
          id: "demo_3",
          name: "Emma Williams",
          email: "emma@innovatesolutions.com",
          company: "Innovate Solutions",
          phone: "+44 7700 900456",
          budget: "500-1500",
          timeline: "asap",
          services: ["design", "development"],
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          status: "qualified",
          source: "consultation",
        },
      ]
      setLeads(demoLeads)
    }
  }, [])

  const updateLeadStatus = (leadId: string, newStatus: Lead["status"]) => {
    const updatedLeads = leads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
    setLeads(updatedLeads)
    localStorage.setItem("consultation-leads", JSON.stringify(updatedLeads))
  }

  const deleteLead = (leadId: string) => {
    const updatedLeads = leads.filter((lead) => lead.id !== leadId)
    setLeads(updatedLeads)
    localStorage.setItem("consultation-leads", JSON.stringify(updatedLeads))
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-600"
      case "contacted":
        return "bg-yellow-600"
      case "qualified":
        return "bg-green-600"
      case "converted":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  const getSourceIcon = (source: Lead["source"]) => {
    switch (source) {
      case "consultation":
        return <Calendar className="w-4 h-4" />
      case "chat":
        return <MessageCircle className="w-4 h-4" />
      case "contact":
        return <Mail className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  const exportLeads = () => {
    const csvContent = [
      ["Name", "Email", "Company", "Phone", "Budget", "Timeline", "Services", "Goals", "Status", "Source", "Date"],
      ...filteredLeads.map((lead) => [
        lead.name,
        lead.email,
        lead.company || "",
        lead.phone || "",
        lead.budget,
        lead.timeline,
        lead.services.join("; "),
        lead.goals || "",
        lead.status,
        lead.source,
        new Date(lead.timestamp).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Calculate stats
  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === "new").length,
    qualifiedLeads: leads.filter((l) => l.status === "qualified").length,
    conversionRate:
      leads.length > 0 ? Math.round((leads.filter((l) => l.status === "converted").length / leads.length) * 100) : 0,
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-bebas text-4xl text-white tracking-wide">Admin Dashboard</h1>
            <p className="text-gray-400">Manage leads, consultations, and track performance</p>
          </div>
          {DEMO && <Badge className="bg-yellow-500 text-black">Demo Mode</Badge>}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-red-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Leads</p>
                  <p className="text-2xl font-bold text-white">{stats.totalLeads}</p>
                </div>
                <Users className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-red-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">New Leads</p>
                  <p className="text-2xl font-bold text-white">{stats.newLeads}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-red-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Qualified</p>
                  <p className="text-2xl font-bold text-white">{stats.qualifiedLeads}</p>
                </div>
                <Package className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-red-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Conversion Rate</p>
                  <p className="text-2xl font-bold text-white">{stats.conversionRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="bg-gray-900 border-red-900/20">
            <TabsTrigger value="leads" className="data-[state=active]:bg-red-600">
              Leads ({leads.length})
            </TabsTrigger>
            <TabsTrigger value="consultations" className="data-[state=active]:bg-red-600">
              Consultations ({consultations.length})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-red-600">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-6">
            {/* Filters and Search */}
            <Card className="bg-gray-900/50 border-red-900/20">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search leads..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    >
                      <option value="all">All Status</option>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted</option>
                    </select>
                  </div>
                  <Button
                    onClick={exportLeads}
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Leads List */}
            <div className="space-y-4">
              {filteredLeads.length === 0 ? (
                <Card className="bg-gray-900/50 border-red-900/20">
                  <CardContent className="p-12 text-center">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No leads found</h3>
                    <p className="text-gray-400">
                      {searchTerm || statusFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : "Leads will appear here as people submit consultation requests"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredLeads.map((lead) => (
                  <Card
                    key={lead.id}
                    className="bg-gray-900/50 border-red-900/20 hover:border-red-600/50 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
                            {getSourceIcon(lead.source)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white text-lg">{lead.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                              <span className="flex items-center">
                                <Mail className="w-4 h-4 mr-1" />
                                {lead.email}
                              </span>
                              {lead.company && (
                                <span className="flex items-center">
                                  <Building className="w-4 h-4 mr-1" />
                                  {lead.company}
                                </span>
                              )}
                              {lead.phone && (
                                <span className="flex items-center">
                                  <Phone className="w-4 h-4 mr-1" />
                                  {lead.phone}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getStatusColor(lead.status)} text-white`}>{lead.status}</Badge>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(lead.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <Label className="text-xs text-gray-400">Budget</Label>
                          <p className="text-sm text-white">£{lead.budget.replace("-", " - ")}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-400">Timeline</Label>
                          <p className="text-sm text-white">{lead.timeline.replace("-", " ")}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-400">Services</Label>
                          <p className="text-sm text-white">{lead.services.join(", ")}</p>
                        </div>
                      </div>

                      {lead.goals && (
                        <div className="mb-4">
                          <Label className="text-xs text-gray-400">Goals</Label>
                          <p className="text-sm text-gray-300 mt-1">{lead.goals}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                        <div className="flex space-x-2">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead["status"])}
                            className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="converted">Converted</option>
                          </select>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-600/50 text-red-400 hover:bg-red-600/10 bg-transparent"
                            onClick={() => window.open(`mailto:${lead.email}`, "_blank")}
                          >
                            <Mail className="w-4 h-4 mr-1" />
                            Email
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white bg-transparent"
                            onClick={() => deleteLead(lead.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="consultations" className="space-y-6">
            <Card className="bg-gray-900/50 border-red-900/20">
              <CardContent className="p-12 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Consultation Management</h3>
                <p className="text-gray-400">
                  Scheduled consultations will appear here. Integration with calendar systems coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-red-900/20">
                <CardHeader>
                  <CardTitle className="text-white">Lead Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["consultation", "chat", "contact"].map((source) => {
                      const count = leads.filter((l) => l.source === source).length
                      const percentage = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0
                      return (
                        <div key={source} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getSourceIcon(source as Lead["source"])}
                            <span className="text-white capitalize">{source}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">{count}</span>
                            <div className="w-20 h-2 bg-gray-700 rounded-full">
                              <div className="h-full bg-red-600 rounded-full" style={{ width: `${percentage}%` }} />
                            </div>
                            <span className="text-sm text-gray-400 w-8">{percentage}%</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-red-900/20">
                <CardHeader>
                  <CardTitle className="text-white">Lead Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["new", "contacted", "qualified", "converted"].map((status) => {
                      const count = leads.filter((l) => l.status === status).length
                      const percentage = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0
                      return (
                        <div key={status} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(status as Lead["status"])}`} />
                            <span className="text-white capitalize">{status}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">{count}</span>
                            <div className="w-20 h-2 bg-gray-700 rounded-full">
                              <div className="h-full bg-red-600 rounded-full" style={{ width: `${percentage}%` }} />
                            </div>
                            <span className="text-sm text-gray-400 w-8">{percentage}%</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
