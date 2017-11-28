class Observable{
    constructor(){
        this.observers = [];
    }
    addObserver(observer){
        this.observers.push(observer)
    }
    removeObserver(observer) {
        let index = this.observers.indexOf(observer)
  
        if (~index) {
          this.observers.splice(index, 1)
        }
    }
    notifyObservers() {
        this.update()
        for (let observer of this.observers) {
          observer()
        }
    }
    update(){}
}