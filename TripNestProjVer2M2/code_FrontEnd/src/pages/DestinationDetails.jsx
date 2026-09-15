import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { destinationService } from "../services/destinationService";

function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const destData = await destinationService.getDestinationById(id);
        if (!isMounted) return;
        setDestination(destData);

        try {
          const attrData = await destinationService.getAttractionsByDestination(id);
          if (isMounted) setAttractions(attrData);
        } catch {
          if (isMounted) setAttractions([]);
        }
      } catch (err) {
        if (isMounted) setError(err.message || "Failed to load destination details.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const defaultImages = {
    bangalore:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
    pune:
      "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=1200&q=80",
    munnar:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    coorg:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    shillong:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    mussoorie:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    goa:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    paris:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    tokyo:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    varanasi:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    rome:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    bali:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
  };

  function getHeroImage() {
    if (destination?.imageUrl) return destination.imageUrl;
    const key = destination?.name?.toLowerCase();
    return (
      defaultImages[key] ||
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
    );
  }

  if (loading) {
    return (
      <div className="content-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading destination guide...</p>
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="content-page">
        <div className="message error">
          <span>⚠️ {error || "Destination not found."}</span>
        </div>
        <Link to="/destinations" className="text-link">
          ← Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="content-page destination-details-page">
      <div className="trip-nav-breadcrumb">
        <Link to="/destinations" className="text-link">
          ← Back to All Destinations
        </Link>
      </div>

      {/* Hero Visual Banner */}
      <section
        className="dest-hero-banner"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.75)), url(${getHeroImage()})`,
        }}
      >
        <div className="dest-hero-content">
          <span className="dest-hero-badge">{destination.country}</span>
          <h1>{destination.name}</h1>
          {destination.type && (
            <p className="dest-hero-subtitle">{destination.type}</p>
          )}
        </div>
      </section>

      {/* Main Details & Travel Guide */}
      <div className="dest-details-layout">
        <div className="dest-main-info">
          <section className="dest-info-card">
            <h2>About {destination.name}</h2>
            <p className="dest-full-description">{destination.description}</p>

            {destination.travelInformation && (
              <div className="travel-tips-box">
                <h3>🧭 Travel Guide & Tips</h3>
                <p>{destination.travelInformation}</p>
              </div>
            )}
          </section>

          {/* Tourist Attractions Section */}
          <section className="attractions-section">
            <div className="section-title-row">
              <div>
                <h2>Top Tourist Attractions</h2>
                <p>Must-visit sights and experiences in {destination.name}.</p>
              </div>
              <span className="count-chip">{attractions.length} Sights</span>
            </div>

            {attractions.length === 0 ? (
              <p className="no-data-msg">
                No specific attractions recorded for this destination yet.
              </p>
            ) : (
              <div className="attraction-cards-grid">
                {attractions.map((attraction) => (
                  <div key={attraction.id} className="attraction-card">
                    <div className="attraction-header">
                      <h3>{attraction.name}</h3>
                      {attraction.category && (
                        <span className="category-pill">
                          {attraction.category}
                        </span>
                      )}
                    </div>

                    {attraction.location && (
                      <span className="attraction-loc">
                        📍 {attraction.location}
                      </span>
                    )}

                    <p className="attraction-desc">{attraction.description}</p>

                    <div className="attraction-fee-row">
                      <span className="fee-label">Entry / Ticket:</span>
                      <strong className="fee-value">
                        {attraction.entryFee && attraction.entryFee > 0
                          ? `₹${attraction.entryFee}`
                          : "Free Entry"}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar Info & Action */}
        <div className="dest-sidebar">
          <div className="sidebar-action-card">
            <h3>Ready to explore?</h3>
            <p>
              Build your day-by-day itinerary and add these attractions to your
              trip schedule.
            </p>

            <button
              className="primary-btn full-btn"
              onClick={() => navigate("/trips")}
            >
              Plan a Trip to {destination.name} ✈
            </button>
          </div>

          <div className="sidebar-meta-card">
            <h4>Quick Facts</h4>
            <div className="quick-fact-item">
              <span>Country</span>
              <strong>{destination.country}</strong>
            </div>

            {destination.type && (
              <div className="quick-fact-item">
                <span>Vibe / Style</span>
                <strong>{destination.type}</strong>
              </div>
            )}

            {destination.bestTimeToVisit && (
              <div className="quick-fact-item">
                <span>Best Season</span>
                <strong>{destination.bestTimeToVisit}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationDetails;
