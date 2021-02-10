// import './components/test';
import 'alpinejs';

if(module.hot){
  module.hot.accept();
}

window.navigation = function(){
  const body = document.querySelector('body');
  return {
    isOpen: false,
    close(){
      this.isOpen = false;
    },
    open(){
      this.isOpen = true;
    },
    toggle(){
      this.isOpen = !this.isOpen;
      if(this.isOpen){
        body.classList.add('overflow-hidden');
      } else {
        body.classList.remove('overflow-hidden');
      }
    },
    isOpen(){
      return this.isOpen === true;
    }
  }
}

if(document.querySelector('.prism')){
  import('./components/prism' /* webpackChunkkName: 'prism' */).then(instance => {
    instance.initPrism();
  });
}

if(document.querySelector('.oos')){
  const gridItems = document.querySelectorAll('.oos');


  const onChange = (changes, observer) => {
    changes.forEach(change => {
      if(change.intersectionRatio === 1){
        change.target.classList.remove('opacity-25');  
      }
    });
  }

  const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 1.0
  };
  
  const observer = new IntersectionObserver(onChange, options);
  
  Array.from(gridItems).forEach(el => {
    el.classList.add('opacity-25');
    observer.observe(el);
  })
}