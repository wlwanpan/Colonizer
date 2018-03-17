import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'

import Planet from '@/components/Dashboard/Views/Planet.vue'
import Habitant from '@/components/Dashboard/Views/Habitant.vue'
import HabitantDetail from '@/components/Dashboard/Views/HabitantDetail.vue'
import MarketPlace from '@/components/Dashboard/Views/MarketPlace.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'planet',
        name: 'Planet',
        component: Planet
      },
      {
        path: 'habitant',
        name: 'Habitant',
        component: Habitant
      },
      {
        path: 'market-place',
        name: 'MarketPlace',
        component: MarketPlace
      },
      {
        path: 'habitant-detail',
        name: 'Habitant Detail',
        component: HabitantDetail
      }
    ]
  }
]

export default routes
