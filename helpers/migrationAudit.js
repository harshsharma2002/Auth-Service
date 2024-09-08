const addAuditTrails = (table) => {
  table.uuid("created_by").nullable().index();
  table.uuid("updated_by").nullable().index();

  table.timestamps(true, true);

  table.index("created_at");
  table.index("updated_at");
};

module.exports = { addAuditTrails };
