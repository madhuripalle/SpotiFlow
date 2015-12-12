/*   
   Adapted from: http://en.literateprograms.org/Merge_sort_(JavaScript)?oldid=19176
 */
 
  
Array.prototype.swap=function(a, b)
{
  	var tmp=this[a];
  	this[a]=this[b];
  	this[b]=tmp;
}
  
function insert(array, begin, end, v)
{
  	while(begin+1<end && array[begin+1]<v) {
  		array.swap(begin, begin+1);
  		++begin;
  	}
  	array[begin]=v;
}
  
function merge(array, begin, begin_right, end, attributes)
{
  	for(;begin<begin_right; ++begin) {
  		if(WeighAttr(array[begin]) > WeighAttr(array[begin_right])) {
  			var v=array[begin];
  			array[begin]=array[begin_right];
  			insert(array, begin_right, end, v);
  		}
  	}
}
  
function msort(array, begin, end, attributes)
{
  	var size=end-begin;
  	if(size<2) return;
  
  	var begin_right=begin+Math.floor(size/2);
  
  	msort(array, begin, begin_right, attributes);
  	msort(array, begin_right, end, attributes);
  	merge(array, begin, begin_right, end, attributes);
}
  
function merge_sort(array, attributes)
{
  	msort(array, 0, array.length, attributes);
}

function WeighAttr(item, attributes) {
	var w = 0;
	for (var a in attributes){
		w += item.track.audiosummary[attributes[a].toLowerCase()];
	} 
	
	w /= attributes.length;
}