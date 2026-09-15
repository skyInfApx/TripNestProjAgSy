import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { tripService } from "../services/tripService";

function Dashboard() {
  const { user } = useAuth();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    tripService
      .getMyTrips()
      .then((data) => {
        if (isMounted) {
          setTrips(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load dashboard metrics");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Calculate user stats
  const totalTrips = trips.length;
  const plannedTrips = trips.filter((t) => t.status === "PLANNED").length;
  const ongoingTrips = trips.filter((t) => t.status === "ONGOING").length;
  const completedTrips = trips.filter((t) => t.status === "COMPLETED").length;

  // Find next upcoming trip (PLANNED or ONGOING)
  const upcomingTrip =
    trips.find((t) => t.status === "ONGOING") ||
    trips.find((t) => t.status === "PLANNED") ||
    trips[0];

  const userName = user?.email ? user.email.split("@")[0] : "Traveler";

  return (
    <div className="content-page dashboard-page">
      {/* Welcome Banner */}
      <section className="dashboard-welcome">
        <div>
          <span className="eyebrow">TRIPNEST DASHBOARD</span>
          <h1>Welcome back, {userName}! 👋</h1>
          <p>
            Your travel command center is ready. Here is a summary of your
            journeys.
          </p>
        </div>
        <div className="dashboard-top-actions">
          <Link className="primary-btn" to="/trips">
            + Plan a Trip
          </Link>
          <Link className="secondary-btn" to="/destinations">
            Explore Places
          </Link>
        </div>
      </section>

      {error && <div className="message error">{error}</div>}

      {/* Metrics Row */}
      <div className="dashboard-grid">
        <div className="dashboard-card highlight">
          <span className="card-icon">✈️</span>
          <span className="card-label">TOTAL TRIPS</span>
          <strong>{totalTrips}</strong>
          <p>
            {totalTrips === 0
              ? "No trips created yet."
              : `${totalTrips} planned or completed voyages.`}
          </p>
          <Link to="/trips" className="text-link">
            View all trips →
          </Link>
        </div>

        <div className="dashboard-card">
          <span className="card-icon">⏳</span>
          <span className="card-label">UPCOMING / ACTIVE</span>
          <strong>{plannedTrips + ongoingTrips}</strong>
          <p>{ongoingTrips > 0 ? `${ongoingTrips} ongoing right now!` : "Waiting for takeoff."}</p>
        </div>

        <div className="dashboard-card">
          <span className="card-icon">🏆</span>
          <span className="card-label">COMPLETED</span>
          <strong>{completedTrips}</strong>
          <p>Memorable past adventures recorded.</p>
        </div>
      </div>

      {/* Spotlight: Next Journey */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Updating your travel schedule...</p>
        </div>
      ) : upcomingTrip ? (
        <section className="upcoming-spotlight-card">
          <div className="spotlight-left">
            <span className="eyebrow">NEXT ADVENTURE SPOTLIGHT</span>
            <h2>{upcomingTrip.title}</h2>
            <p className="spotlight-dest">
              📍 <strong>{upcomingTrip.destination}</strong> ·{" "}
              <span>
                {upcomingTrip.startDate} → {upcomingTrip.endDate}
              </span>
            </p>
            <p className="spotlight-desc">
              👥 {upcomingTrip.numberOfTravelers} Travelers · Status:{" "}
              <span className={`status-pill ${upcomingTrip.status.toLowerCase()}`}>
                {upcomingTrip.status}
              </span>
            </p>
          </div>

          <div className="spotlight-right">
            <Link
              to={`/trips/${upcomingTrip.id}`}
              className="primary-btn spotlight-btn"
            >
              Continue Itinerary & Activities →
            </Link>
          </div>
        </section>
      ) : (
        <section className="upcoming-spotlight-card empty">
          <div className="spotlight-left">
            <span className="eyebrow">NO UPCOMING TRIPS</span>
            <h2>Where are you headed next?</h2>
            <p>
              Discover inspiring destinations or start planning your personalized
              itinerary now.
            </p>
          </div>
          <div className="spotlight-right">
            <Link to="/trips" className="primary-btn">
              + Create Your First Trip
            </Link>
          </div>
        </section>
      )}

      {/* Recent Trips Quick Access */}
      {trips.length > 0 && (
        <section className="recent-trips-section">
          <div className="section-header-row">
            <div>
              <span className="eyebrow">RECENT TRIPS</span>
              <h2>Your Travel Library</h2>
            </div>
            <Link to="/trips" className="text-link">
              View All ({trips.length}) →
            </Link>
          </div>

          <div className="recent-trips-list">
            {trips.slice(0, 3).map((trip) => (
              <div key={trip.id} className="recent-trip-row">
                <div className="recent-trip-info">
                  <strong>{trip.title}</strong>
                  <span>
                    📍 {trip.destination} · {trip.startDate}
                  </span>
                </div>
                <div className="recent-trip-actions">
                  <span className={`status-pill ${trip.status.toLowerCase()}`}>
                    {trip.status}
                  </span>
                  <Link to={`/trips/${trip.id}`} className="outline-btn small">
                    Manage →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Dashboard;
