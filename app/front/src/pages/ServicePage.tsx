import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ServiceCard } from "@/components/ServiceCard"
import { getMyServices } from "@/services/service.service"
import type { IService, IServiceStatus } from "@/types/service"

export default function ServicePage() {

  const [services, setServices] = useState<IService[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await getMyServices()
        setServices(data)
      } catch {
        setError("Erreur lors du chargement des services")
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  function handleStatusUpdate(serviceId: number, newStatus: IServiceStatus) {
    setServices((prev) =>
      prev.map((service) =>
        service.id === serviceId ? { ...service, status: newStatus } : service
      )
    )
  }

  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Mes Réservations</h1>

        {loading && <p>Chargement...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && services.length === 0 && (
          <p>Aucune réservation trouvée.</p>
        )}

        <div className="space-y-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              currentUserId={service.giverId}
              onStatusUpdate={(newStatus) => handleStatusUpdate(service.id, newStatus)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
