import Ember from 'ember';

const {
  Route,
  inject
} = Ember;

export default Route.extend({
  fastboot: inject.service(),

  queryParams: {
    query: {
      replace: true
    }
  },

  model() {
    const isFastBoot = this.get('fastboot.isFastBoot');
    const shoebox = this.get('fastboot.shoebox');
    let shoeboxStore = shoebox.retrieve('store');

    if (!isFastBoot && shoeboxStore) {
      return shoeboxStore;
    }

    return this.store.findAll('package').then(deals => {
      if (isFastBoot) {
        shoebox.put('store', deals.toArray());
      }
      return deals;
    });
  },

  afterModel() {
    if (this.get('fastboot.isFastBoot')) {
      return;
    }

    performance.mark('dataLoaded');
    Ember.run.schedule('afterRender', renderEnd);
  }
});

/*
 * This provides two additional benchmarking modes `?perf.profile` and
 * `?perf.tracing`. The former wraps the initial render in a CPU profile. The
 * latter is intended to be used with `chrome-tracing` where it redirects to
 * `about:blank` after the initial render as the termination signal.
 */
function renderEnd() {
  requestAnimationFrame(() => {
    performance.mark('beforePaint');

    requestAnimationFrame(() => {
      performance.mark('afterPaint');

      performance.measure('assets', 'domLoading', 'beforeVendor');

      performance.measure('evalVendor', 'beforeVendor', 'beforeApp');
      performance.measure('evalApp', 'beforeApp', 'afterApp');

      performance.measure('boot', 'beforeVendor', 'willTransition');
      performance.measure('routing', 'willTransition', 'didTransition');
      performance.measure('render', 'didTransition', 'beforePaint');
      performance.measure('paint', 'beforePaint', 'afterPaint');

      performance.measure('data', 'willTransition', 'dataLoaded');
      performance.measure('adterData', 'dataLoaded', 'beforePaint');

      if (location.search === '?perf.tracing') {
        document.location.href = 'about:blank';
      } else if (location.search === '?perf.profile') {
        console.profileEnd('initialRender');
      }
    });
  });
}
