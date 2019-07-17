<template>
  <div class="tag-cloud">
    <router-link
      :to="{ name: 'details', params: { id: item.id } }"
      v-for="item in items"
      :key="item.id"
      v-bind:style="{ 
        fontSize: item.size + 'px',
        color: item.color,
        lineHeight: Math.ceil(item.size*0.76) + 'px'
      }"
    >
      {{ item.label }}
    </router-link>
  </div>
</template>

<script>
import {getRandomNumber} from '../helpers'

export default {
  name: "TagCloud",
  props: {
    items: Array
  },
  methods: {
  work(){
    let links = this.$el.childNodes;
    let wrap = this.$el;
    const rect = wrap.getBoundingClientRect(); 
    const bounds = [rect.width,rect.height];
    const allRectangles = [];
    let avaliableAres = [{x1: 0,x2: rect.width, y1: 0, y2: rect.height}];
    function checkPoint(a,b){
      a = {x:a.x1, x1:a.x2,y:a.y1, y1:a.y2};
      b = {x:b.x1, x1:b.x2,y:b.y1, y1:b.y2};
      return(
        (
          (
            ( a.x>=b.x && a.x<=b.x1 )||( a.x1>=b.x && a.x1<=b.x1  )
          ) && (
            ( a.y>=b.y && a.y<=b.y1 )||( a.y1>=b.y && a.y1<=b.y1 )
          )
        )||(
          (
            ( b.x>=a.x && b.x<=a.x1 )||( b.x1>=a.x && b.x1<=a.x1  )
          ) && (
            ( b.y>=a.y && b.y<=a.y1 )||( b.y1>=a.y && b.y1<=a.y1 )
          )
        )
      )||(
        (
          (
            ( a.x>=b.x && a.x<=b.x1 )||( a.x1>=b.x && a.x1<=b.x1  )
          ) && (
            ( b.y>=a.y && b.y<=a.y1 )||( b.y1>=a.y && b.y1<=a.y1 )
          )
        )||(
          (
            ( b.x>=a.x && b.x<=a.x1 )||( b.x1>=a.x && b.x1<=a.x1  )
          ) && (
            ( a.y>=b.y && a.y<=b.y1 )||( a.y1>=b.y && a.y1<=b.y1 )
          )
        )
      );
    }
    function addEl(el){
      let currentRect = el.getBoundingClientRect();
      let width = currentRect.width,
          height = currentRect.height;
      
      let ops = 30;
      while(ops>0){
        ops--;
        if(ops==0){
          console.log("VERY BAD");
          el.style.display = 'none';
        }
        let x1 = getRandomNumber(0,bounds[0]-width);
        let y1 = getRandomNumber(0,bounds[1]-height);
        let x2 = x1+width,
            y2 = y1+height;
        let ok = true;
        for(let it of allRectangles) {
          if(checkPoint({x1,y1,x2,y2},it))ok = false;
          
        }
        if(ok) {
          allRectangles.push({x1,x2,y1,y2});
          el.style.transform = `translate(${x1}px, ${y1}px)`;
          // el.style.top = y1 + "px";
          break;
        }
      }

    }

    for(let el of links) {
      el.style.display = 'block';
      el.style.position = 'absolute';

      addEl(el);
    }
  }
},

  async updated(){
   this.work();
   let timeout = null;
   window.addEventListener("resize", ()=>{
     clearTimeout(timeout);
     timeout = setTimeout( ()=>{
       this.work()
      }, 300)
   });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.tag-cloud {
  p {
    margin: 0;
    line-height: 1;
  }
  a {
    text-decoration: none;
    transition: transform .5s ease-in-out;
  }
  width: 100vw;
  max-width: 100vw;
  overflow: hidden;
  // border-radius: 50%;
  // border: 1px solid #000;
  margin: 0 auto;
  position: relative;
  height: 140px;
}
</style>
