import Mock from 'mockjs'

export default {
    mockData() {
        Mock.mock('/api/user/login', {
            'success': true,
            'result': {
                'id': '100001',
                'name': 'jhqin',
                'roles': ['admin']
            }
        })
        Mock.mock('/api/user/register', {
            'success': true,
            'result': {}
        })
    }
}