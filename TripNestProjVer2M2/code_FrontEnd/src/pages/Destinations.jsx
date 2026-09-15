import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { destinationService } from "../services/destinationService";

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    let isMounted = true;
    destinationService
      .getAllDestinations()
      .then((data) => {
        if (isMounted) {
          setDestinations(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load destinations.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [reloadTrigger]);

  // Fallback image map if a destination doesn't have an imageUrl stored
  const defaultImages = {
    bangalore:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
    pune:
      "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
    munnar:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    coorg:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    shillong:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    mussoorie:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    goa:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    paris:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    tokyo:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    varanasi:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    rome:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
    bali:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  };

  function getImageUrl(dest) {
    if (dest.imageUrl) return dest.imageUrl;
    const key = dest.name.toLowerCase();
    return (
      defaultImages[key] ||
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
    );
  }

  // Filter logic
  const filtered = destinations.filter((d) => {
    const matchesSearch =
      `${d.name} ${d.country} ${d.type || ""}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesType =
      selectedType === "ALL" ||
      (d.type && d.type.toLowerCase().includes(selectedType.toLowerCase()));
    return matchesSearch && matchesType;
  });

  return (
    <div className="content-page destinations-page">
      {/* Header */}
      <section className="page-heading">
        <span className="eyebrow">DISCOVER YOUR NEXT ESCAPE</span>
        <h1>Explore Destinations</h1>
        <p>
          Curated guides, top tourist attractions, and travel inspiration from
          across India and the world.
        </p>
      </section>

      {/* Search and Filters */}
      <div className="destinations-toolbar">
        <div className="search-bar">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search by city, country, or travel vibe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-pill-group">
          {[
            "ALL",
            "Hill Station",
            "Metropolis",
            "Beaches",
            "Heritage",
            "Eco-Tourism",
          ].map((type) => (
            <button
              key={type}
              className={`filter-chip ${selectedType === type ? "active" : ""}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="message error">
          <span>⚠️ {error}</span>
          <button className="small-link-btn" onClick={() => { setLoading(true); setReloadTrigger(r => r + 1); }}>
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Discovering destinations...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-trips-card">
          <span className="empty-icon">🌍</span>
          <h2>No destinations found</h2>
          <p>Try searching for a different city or category.</p>
        </div>
      ) : (
        /* Destination Cards Grid */
        <div className="destination-cards-grid">
          {filtered.map((dest) => (
            <article key={dest.id || dest.name} className="rich-destination-card">
              <div className="dest-image-wrap">
                <img
                  src={getImageUrl(dest)}
                  alt={dest.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <span className="dest-country-badge">{dest.country}</span>
              </div>

              <div className="dest-card-body">
                <div className="dest-header-row">
                  <h3>{dest.name}</h3>
                  {dest.type && (
                    <span className="dest-type-tag">{dest.type}</span>
                  )}
                </div>

                <p className="dest-description">{dest.description}</p>

                {dest.bestTimeToVisit && (
                  <div className="best-time-chip">
                    🌤️ <strong>Best time:</strong> {dest.bestTimeToVisit}
                  </div>
                )}

                <div className="dest-card-footer">
                  <Link
                    to={`/destinations/${dest.id}`}
                    className="primary-btn small-full-btn"
                  >
                    View Guide & Attractions →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Destinations;
