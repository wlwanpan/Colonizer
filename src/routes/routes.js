import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'

import Planet from '@/components/Dashboard/Views/Planet.vue'
import Habitant from '@/components/Dashboard/Views/Habitant.vue'
import HabitantDetail from '@/components/Dashboard/Views/HabitantDetail.vue'
import HabitantList from '@/components/Dashboard/Views/HabitantList.vue'
import MarketPlace from '@/components/Dashboard/Views/MarketPlace.vue'
import AssetsForm from '@/components/Dashboard/Views/AssetsForm.vue'
import ProposalForm from '@/components/Dashboard/Views/ProposalForm.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/planet'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/planet',
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
      },
      {
        path: 'habitant-list',
        name: 'Habitant List',
        component: HabitantList
      },
      {
        path: 'assets-form',
        name: 'Assets Form',
        component: AssetsForm
      },
      {
        path: 'proposal-form',
        name: 'Proposal Form',
        component: ProposalForm
      }
    ]
  }
]

export default routes
