const opts = { duration: 300, delay: 100, easing: 'easeInOutQuart' };
const media = '(min-width: 768px)';

// Only animate between page results if the distance between the pages is one.
// This avoids animations occuring when the distance between pages is possibly more 
// that one (i.e. clicking the logo).

export default function(){
  this.transition(
    this.hasClass('lf-slider'),
    this.media(media),
    this.toValue(function(newPage, oldPage){
      return newPage.meta.page - 1 === oldPage.meta.page;
    }),
    this.use('toLeft', opts)
  );

  this.transition(
    this.hasClass('lf-slider'),
    this.media(media),
    this.toValue(function(newPage, oldPage){
      return newPage.meta.page + 1 === oldPage.meta.page;
    }),
    this.use('toRight', opts)
  );
};
