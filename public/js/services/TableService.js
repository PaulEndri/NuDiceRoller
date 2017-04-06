angular.module('TableService', []).factory('Table', ['$http', function ($http) {

    return {
        get: function (val) {
            if (val) {
                return $http.geT('/tables/' + val);
            }

            return $http.get('/tables');
        },

        create: function (data) {
            return $http.post('/tables/create', data);
        },

        delete: function (id) {
            return $http.delete('/tables/delete/' + id);
        },

        addPlayer: function (data) {
            return $http.post('/tables/addPlayer/', data);
        }
    }

}]);