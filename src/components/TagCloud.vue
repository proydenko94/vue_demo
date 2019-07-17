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
  async updated(){
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
    function removeElementsByClass(className){
      var elements = document.getElementsByClassName(className);
      while(elements.length > 0){
          elements[0].parentNode.removeChild(elements[0]);
      }
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
          el.style.left = x1 + "px";
          el.style.top = y1 + "px";
          break;
        }
      }

    }

    for(let el of links) {
      
      el.style.position = 'absolute';

      addEl(el);

      // await new Promise((resolve,reject)=>{
      //   setTimeout(resolve, 200);
      // })
      // removeElementsByClass('rec');
      // for(let q of avaliableAres) {
        
      //   let rec = document.createElement('div');
      //   rec.style.position = 'absolute';
      //   rec.style.left = q.x1 + 'px';
      //   rec.style.top = q.y1 + 'px';
      //   rec.style.width = q.x2 - q.x1 + 'px';
      //   rec.style.height = (q.y2 - q.y1) + 'px';
      //   rec.style.border = '1px solid #000';
      //   rec.className = 'rec';
      //   wrap.appendChild(rec);
      // }
      // ii--;
      // if(ii<0)
      // break;
    }
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
  }
  width: 500px;
  // border-radius: 50%;
  border: 1px solid #000;
  margin: 0 auto;
  position: relative;
  height: 300px;
}
</style>
