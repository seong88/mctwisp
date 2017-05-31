app.controller('ProductsCtrl', function($scope, Product, ngProgress, toaster) {

  var auth, database, userInfo, userID;
  // Initialize Firebase (provided by Firebase)
  var config = {
    apiKey: "AIzaSyAr0gH9u62ryX7op4l6RpelbmDshFR-1Wk",
    authDomain: "mctwisp-254d6.firebaseapp.com",
    databaseURL: "https://mctwisp-254d6.firebaseio.com",
    projectId: "mctwisp-254d6",
    storageBucket: "mctwisp-254d6.appspot.com",
    messagingSenderId: "676792340695"
  };
  firebase.initializeApp(config);
  //authentication
  auth = firebase.auth(); //
  database = firebase.database();
  var authProvider = new firebase.auth.GoogleAuthProvider();
  authProvider.setCustomParameters({
    prompt: 'select_account'
  });
  /*check for login status*/
  auth.onAuthStateChanged(function(user) {
    if (user) {
      //success log
      console.log("success");
      console.log(user);
      $scope.userInfo = user;
      
    }
    else {
      //call login popup
      fn_login();
    }
  });

  //fx for login
  function fn_login() {
    auth.signInWithPopup(authProvider);
  };

  //fx for logout
  $scope.fn_logout = function(){
    alert("logout initiated");
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });

  };
  
  
  
  /*initialize and refresh*/
  $scope.product = new Product();

  var refresh = function() {
    $scope.products = Product.query();
    $scope.product = "";
  }
  refresh();
  
  /*Timer FN*/
  $scope.fn_timeStart = function(product){
    var time = new Date();
    var newTimer = {start:time.getTime()};
    product.timeArr.push(newTimer);
    
  };
  
  $scope.fn_timeEnd = function(product){
    var time = new Date();
    
    product.timeArr[product.timeArr.length-1].end = time.getTime();
    $scope.start = product.timeArr[product.timeArr.length-1].start
    var end = product.timeArr[product.timeArr.length-1].end
    
    product.timeArr[product.timeArr.length-1].sum = end-$scope.start;
    product.timeArr[0].sum+=end-$scope.start;
    product.$update(function() {
      refresh();
    });
  };
  
  $scope.getElapsedMs = function() {
    var time = new Date();
    var now = time.getTime();
    return  now-$scope.start;
    };
    
  /*CRUD*/

  $scope.add = function(product) {
    product.data.added_on = Date();
    product.data.last_edit = Date();
    product.timeArr = {
        sum: 0
    };
    
    product.user = $scope.userInfo.uid;
    Product.save(product, function(product) {
      refresh();
    });
  };

  $scope.update = function(product) {
    product.data.last_edit = Date();
    product.$update(function() {
      refresh();
    });
  };

  $scope.remove = function(product) {
    product.$delete(function() {
      refresh();
    });
  };

  $scope.edit = function(id) {

    $scope.product = Product.get({
      id: id
    });
  };

  $scope.deselect = function() {
    $scope.product = "";
  }

})
