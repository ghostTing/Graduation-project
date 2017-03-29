/**
 * Created by Administrator on 2017/3/27.
 */
(function () {
    var BASIC_DATA={
        TOP_ROUTER:'index.html#!/',
        routerConfig:{
            taskUpload:{
                state:"taskUpload",
                moduleName:'任务上传',
                url: '/taskUpload',
                templateUrl:"view/task_upload.html",
                controller: 'indexController'
            },
            contentProduce:{
                state:"contentProduce",
                moduleName:'内容制作',
                url: '/contentProduce',
                templateUrl:"view/content_produce.html",
                controller: 'contentProduceController'
            }
        },
        API_URL:' http://localhost:3000'
    };
    window.BASIC_DATA=BASIC_DATA;
})();