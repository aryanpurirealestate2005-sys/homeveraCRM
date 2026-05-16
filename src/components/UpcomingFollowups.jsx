function UpcomingFollowups({ leads }) {

  const today = new Date();

  const upcoming = leads.filter((lead) => {
    if (!lead.followUpDate) return false;

    const followDate = new Date(lead.followUpDate);
    return followDate >= today;
  });

  return (
    <div className="card">
      <h3>Upcoming Follow-ups</h3>

      {upcoming.length === 0 ? (
        <p>No follow-ups scheduled</p>
      ) : (
        upcoming.map((lead) => (
          <div
            key={lead.id}
            style={{
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.05)"
            }}
          >
            <strong>{lead.name}</strong>
            <p>{lead.phone}</p>
            <p>📅 {lead.followUpDate}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default UpcomingFollowups;