/*
setTimeout(function () {
    window.location='/index.html'
},2000)*/
(function () {
    var loginApp=angular.module('loginApp',['oitozero.ngSweetAlert']);
    angular.module('loginApp').controller('loginController',['$scope','SweetAlert',function ($scope,SweetAlert) {
        declareModel($scope);
        declare($scope,SweetAlert);
        init($scope);
    }]);
    /*声明和页面交互的model*/
    function declareModel($scope) {
        $scope.enterSelected=false;
        $scope.auditSelected=false;
        $scope.confirmPassword='';
        $scope.resUserName='';
        $scope.regPassword='';
    }
    function declare($scope,SweetAlert) {
        $scope.viewController={
            /*完成注册*/
            finishReg:function () {
                if(($scope.enterSelected||$scope.auditSelected)&&$scope.resUserName.length>=3&&$scope.regPassword.length>=3&&$scope.confirmPassword>=3){
                    if ($scope.regPassword!=$scope.confirmPassword){
                        SweetAlert.swal("两次密码输入不一致", "温馨提示：密码区分大小写！");
                    }
                }else if(!$scope.resUserName||$scope.resUserName.length<3){
                    SweetAlert.swal("请输入3位以上的用户名");
                }else if(!$scope.regPassword||$scope.regPassword.length<3){
                    SweetAlert.swal("请输入3位以上的密码");
                }else if(!$scope.confirmPassword){
                    SweetAlert.swal("请确认密码");
                }else if(!($scope.enterSelected||$scope.auditSelected)){
                    SweetAlert.swal("请选择一个角色");
                }
            }
        }
    }
    function init($scope) {
        /*JQ控制*/
        $(function () {
            $('.login-tab').on('click',function () {
                $(this).addClass('active').siblings('li').removeClass('active');
                $('.login-form').removeClass('dn');
                $('.register-form').addClass('dn');
            });
            $('.register-tab').on('click',function () {
                $(this).addClass('active').siblings('li').removeClass('active');
                $('.login-form').addClass('dn');
                $('.register-form').removeClass('dn');
            });
            $('.login-btn').click(function () {
                window.location='/index.html';
            });
        });

    }
})();

