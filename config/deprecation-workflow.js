window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "throw", matchMessage: "Using the injected `container` is deprecated. Please use the `getOwner` helper instead to access the owner of this object." }
  ]
};
