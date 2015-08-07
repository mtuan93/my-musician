myApp.controller('CheckinController',
    function($scope, $firebase, $firebaseAuth, $location, $rootScope, $timeout, FIREBASE_URL, Authentication) {

        //Handle checkin button
        $scope.isSubmitting = null;
        $scope.result = null;
        $scope.options = {};
        $scope.options.buttonDefaultText = "Check in this party";
        $scope.options.buttonSubmittingIcon = 'fa fa-spinner';
        $scope.options1 = {};
        $scope.options1.buttonDefaultText = "Party's gallery";
        $scope.options1.buttonSubmittingIcon = 'fa fa-spinner';
        $scope.options2 = {};
        $scope.options2.buttonSubmittingIcon = 'fa fa-spinner';
        $scope.options2.buttonDefaultText = "Check in now!";
        $scope.options2.buttonSubmittingText = "Checking in";
        $scope.options2.buttonSuccessText = "Checked in";
        $scope.options3 = {};
        $scope.options3.buttonSubmittingIcon = 'fa fa-spinner';
        $scope.options3.buttonDefaultText = 'Post new message';
        $scope.options3.buttonSubmittingText = 'Updating';
        $scope.options3.buttonSuccessText = 'Updated';
        $scope.options3.buttonSuccessIcon = null;
        var ref = new Firebase(FIREBASE_URL + '/users/');
        $scope.allUsers = $firebase(ref).$asArray();
        $scope.user = {};
        $scope.go = function(path) {
            $scope.options.buttonSubmittingText = 'Accessing checkins';
            $scope.options.buttonSuccessText = 'Access verified';
            $scope.isSubmitting = true;
            $timeout(function() {
                $scope.result = 'success';
            }, 1000)
                .then(function() {
                    $timeout(function() {
                        $location.path(path);
                    }, 1000);
                });
        }; //go

        $scope.go1 = function(path) {
            $scope.options1.buttonSubmittingText = 'Accessing gallary';
            $scope.options1.buttonSuccessText = 'Access verified';
            $scope.isSubmitting1 = true;
            $timeout(function() {
                $scope.result1 = 'success';
            }, 1000)
                .then(function() {
                    $timeout(function() {
                        $location.path(path);
                    }, 1000);
                });
        }; //go1

        $scope.submitCheckin = function() {
            var ref = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id);
            var userInfo = $firebase(ref);
            var userObj = userInfo.$asObject();
            if($scope.user.changeMessage) {
                
            }
            $scope.isSubmitting = true;
            $timeout(function() {
                $scope.result = 'success';
            }, 1000)
                .then(function() {
                    $timeout(function() {
                        userInfo.$update({
                            message: $scope.user.message,
                            checkinTime: Firebase.ServerValue.TIMESTAMP
                        });
                        $scope.user.message = '';
                        $scope.user.changeMessage = false;
                    }, 1000);
                });
        }; // submit Checkin

        $scope.isUserMessage = function(person) {
            return person.$id === $rootScope.currentUser.$id;
        }; // isUserMessage

        $scope.changeMessage = function() {
            $scope.user.changeMessage = true;
        }; //changeMessage
    });