function*e(e,r,n=1){if(null==r&&(r=e,e=0),0===n)throw new Error("Range must have a non-zero step.");if(!(e>=r&&n>0||e<=r&&n<0))for(let o=e;e<r?o<r:o>r;o+=n)yield o}export{e as r};
