/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/***
 * Filtre utilisé pour mettre en forme les références bibliographiques avec un lien sur les reférence
 * @param {type} param1
 * @param {type} param2
 */
angular.module('richeFilter', []).filter('sourceFilter', function ($sce) {
    return function (input) {
        var retour = "";
        retour += "<a href=\"#/source-view/"+input.id+"\">";
        array = input.relationPerson;
        for (var i = array.length - 1; i >= 0; i--) {
         
            array[i].person.label;
            retour +=   array[i].person.label + ", ";
        }
        retour += "<i>" + input.title + "</i>, ";
        retour += input.releaseTown + ", ";

        retour = concatInBiblioNotice(retour, input.editor);
//        retour+=input.editor+', ';
        retour = concatInBiblioNotice(retour, input.releaseYear);
        if (retour.length > 2) {
            retour = retour.substr(0, retour.length - 2);
        }
        retour+="</a>";
        return $sce.trustAsHtml(retour);
    };

    function concatInBiblioNotice(notice, addString) {
        if (addString !== null) {
            return notice += addString + ", ";
        }
        return notice;
    }
})

//        .filter('authorFilter', function ($sce) {
//            return function (input) {
//
//                retour = "";
//                array = input;
//                for (var i = array.length - 1; i >= 0; i--) {
//
//                    array[i].label;
//
//                    retour += array[i].label + ", ";
//                }
//                return retour;
//            };
//        })
        
        /***
         * Affiche les auteurs depuis une relation person
         * @param {type} $sce
         * @returns {Function}
         */
        .filter('relationPersonAffPerson', function ($sce) {
            return function (input) {
                retour = "";
                array = input;
                for (var i = array.length - 1; i >= 0; i--) {
                    retour += array[i].person.label + ", ";
                }
                return retour;
            };
        })
        
        /***
         * Affiche une concaténation du siècle min et max dans le listing des sources
         * @param {type} $sce
         * @returns {Function}
         */
        .filter('centuryFilter', function ($sce){
            console.log($sce);
            return function (input, arg){
                var centuryMin = input;
                var centuryMax = arg;
                
                if(centuryMin !== null && centuryMax !== null){
                    
                    if(centuryMin === centuryMax){
                        return centuryMin+" e s";
                    }
                    else{
                        return centuryMin + "e - " + centuryMax+"e s";
                    }               
                }
                else if (centuryMin !== null){
                    return centuryMin + " e s";
                }
                else if (centuryMax !== null){
                    return centuryMax + " e s";
                }
                else{
                    return "";
                }
            };
        })
        
        .filter('articleHtml', function($sce){
            return function (myHtml) {
                return $sce.trustAsHtml(myHtml);
            }
        })
        ;


//app.filter('convertState', function ($sce) {
//        return function (state) {
//            if (state == 1) {
//                return $sce.trustAsHtml("<strong>" + state + "</strong> special state");
//            }
//            else {
//                return $sce.trustAsHtml("<strong>"+state + "</strong> normal state");
//            }
//        }
//    });

      