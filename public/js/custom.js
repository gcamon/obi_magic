var app = angular.module('myApp',[])

app.directive('fileUploader', ['$rootScope','httpPostFactory','localManager',
function ($rootScope,httpPostFactory,localManager) {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attr) {

            element.bind('change', function () {
                var formData = new FormData();
                formData.append('file', element[0].files[0]);
                httpPostFactory('/en/offshore-i/upload/auth-signup', formData, function (response) {
                   // recieve image name to use in a ng-src 
                    $rootScope.imgURL = '/uploads/' + response.data[0].filename;
                    if(localManager.getValue('user')){
                        var person = localManager.getValue('user');
                        person.profile_pic_url = $rootScope.imgURL;
                        localManager.setValue('user',person);
                    }
                });
            });

        }
    };
}]);

app.factory('httpPostFactory', function ($http) {
    return function (file, data, callback, method) {
        $http({
            url: file,
            method: (method) ? method : "POST",
            data: data,
            headers: (!data.email && !data.username && !data.userId) ? {'Content-Type': undefined} : {'Content-Type': 'application/json'}
        }).then(function (response) {
            callback(response);
        }).catch((err) => console.log(err))
    };
});

app.factory("localManager",["$window",function($window){
    return {
      setValue: function(key, value) {
        $window.localStorage.setItem(key, JSON.stringify(value));
      },
      getValue: function(key) {       
        return JSON.parse($window.localStorage.getItem(key)); 
      },
      removeItem: function(key) {
        $window.localStorage.removeItem(key);
      }
    };
}]);
  

app.controller('registerCtrl',['$http','$scope','$rootScope','httpPostFactory',
function($http,$scope,$rootScope,httpPostFactory){
    $rootScope.user = {};
    $scope.isProfilePic = false;

    $scope.continue = function() {
        $scope.isProfilePic = true;
    }

    $scope.submitForm = function() {
        $scope.isProfilePic = true;
        if(!$rootScope.user.accType || !$rootScope.user.accountHolder || Object.keys($rootScope.user).length < 9){
            alert('Please complete all fields');
            $scope.isProfilePic = false;
            return;
        }

        $rootScope.user.profile_pic_url = `${window.location.host}${$rootScope.imgURL}`

        httpPostFactory('/en/offshore-i/o/auth-signup', $rootScope.user, function (response) {
            $rootScope.isComplete = true;            
        });

    }

    $scope.back = function () {
        $scope.isProfilePic = false;
    }
    
}])

app.controller('loginCtrl',['$scope','$rootScope','httpPostFactory','localManager',
function($scope,$rootScope,httpPostFactory,localManager){
    $scope.user = {}
    $scope.login = function() {
        $scope.error = ""
        httpPostFactory('/en/offshore-i/o/auth-login', $scope.user, function (response) {
            if(response.data._id){
                var resp = response.data;  
                localManager.setValue('user',resp);           
                if(resp.isAdmin){
                    window.location.href = '/en/offshore-i/o/auth/dashboard'
                } else {
                    window.location.href = '/en/offshore-i/o/auth/account'
                }        
            } else {
                $scope.error = "Wrong username or password"
            }
           
        });
    }
}])

app.controller('dashboardCtrl',['$scope','$http','httpPostFactory','localManager',
function($scope,$http,httpPostFactory,localManager){
    if(!localManager.getValue('user')){
        window.location.href = '/en/offshore-i/o/login'
    }
    $http.get('/en/offshore-/admin272764321100733/usrs')
    .then((response) => {
        $scope.usersList = response.data;
    })
    .catch((err) => console.log(err))

    $scope.updating = false;

    $scope.update = function(user) {
        $scope.updating = true
        httpPostFactory('/en/offshore-i/o/auth/dashboard', user, function (response) {
            $scope.updating = false
            alert(`${response.data.accountHolder} changes has been successfully updated!`)
        });
    }

    $scope.logOut = function() {
        localManager.removeItem('user')
        window.location.href = '/en/offshore-i/o/login'
    }
    
}])

app.controller('accountCtrl',['$scope','$http','httpPostFactory','localManager','$rootScope',
function($scope,$http,httpPostFactory,localManager,$rootScope){
    if(!localManager.getValue('user')){
        window.location.href = '/en/offshore-i/o/login'
    }

    $scope.beneficiary = {};

    $rootScope.user = localManager.getValue('user')

    $scope.isLanding = true;
    $scope.isChangPic = false;

    $scope.changePic = function() {
        $scope.isLanding = false;
        $scope.isChangPic = true;
    }

    $scope.isDashboard = 'active'
    $scope.isProfile = ''
    $scope.isTransaction = ''
    $scope.isTransfer = ''
    $scope.isBills = ''
    $scope.isContact = ''

    $scope.navigate = function(path) {
        switch(path){
            case 'dashboard':
                $scope.isDashboard = 'active'
                $scope.isProfile = ''
                $scope.isTransaction = ''
                $scope.isTransfer = ''
                $scope.isBills = ''
                $scope.isContact = ''
                break;
            case 'profile':
                $scope.isDashboard = ''
                $scope.isProfile = 'active'
                $scope.isTransaction = ''
                $scope.isTransfer = ''
                $scope.isBills = ''
                $scope.isContact = ''
                break;
            case 'transaction':
                $scope.isDashboard = ''
                $scope.isTransaction = 'active'
                $scope.isProfile = ''
                $scope.isTransfer = ''
                $scope.isBills = ''
                $scope.isContact = ''
                break;
            case 'transfer':
                $scope.isDashboard = ''
                $scope.isTransaction = ''
                $scope.isProfile = ''
                $scope.isTransfer = 'active'
                $scope.isBills = ''
                $scope.isContact = ''
                break;
            case 'bills':
                $scope.isDashboard = ''
                $scope.isTransaction = ''
                $scope.isProfile = ''
                $scope.isTransfer = ''
                $scope.isBills = 'active'
                $scope.isContact = ''
                break;
            case 'contact':
                $scope.isDashboard = ''
                $scope.isTransaction = ''
                $scope.isTransfer = ''
                $scope.isProfile = ''
                $scope.isBills = ''
                $scope.isContact = 'active'
                break;
            default:
                $scope.isDashboard = 'active'
                $scope.isTransaction = ''
                $scope.isProfile = ''
                $scope.isTransfer = ''
                $scope.isBills = ''
                $scope.isContact = ''
                break;
        }
    }

    $http.get(`/en/offshore-i/o/auth/transfer?userId=${$rootScope.user._id}`)
    .then(function(response){
        $scope.transactions = (response.data.length > 0)  ? response.data 
        : [{amount:"$1,230,200",createdAt:new Date(),message:"BNP/channel0123"}]
    }).catch(function(err){
        console.log(err)
    })

    $scope.confirmTransfer = function() {
        if(!$scope.beneficiary.amount || !$scope.beneficiary.bank 
            || !$scope.beneficiary.destinationAcc || !$scope.beneficiary.destinationName){
            alert("Please complete all the fields necessary for the transfer.")
            return;
        }
        $scope.proceed = true;
    }

    $scope.finishTransfer = function(answer){
        if(answer == 'Yes'){

        } else {
            $scope.proceed = false;
        }
    }

    $scope.done = function() {
        $rootScope.user = localManager.getValue('user')
        $scope.isLanding = true;
        $scope.isChangPic = false;
        httpPostFactory('/en/offshore-i/upload/auth-signup', 
        {userId: $rootScope.user._id,url: $rootScope.user.profile_pic_url}, function (response) {
            // recieve image name to use in a ng-src 
            alert("Profile picture changed!")
        },'PUT');
    }

    $scope.logOut = function() {
        localManager.removeItem('user')
        window.location.href = '/en/offshore-i/o/login'
    }

}])


