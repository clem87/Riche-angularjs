/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('richeFilter', []).filter('sourceFilter', function() {
  return function(input) {
      return input.title;
//      alert('input' + JSON.stringify(input));
//    return input ? '\u2713' : '\u2718';
  };
});