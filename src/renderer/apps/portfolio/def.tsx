import * as React from 'react'
import { AppDefinition } from "../../components/app-definition"
import PortfolioApp from "./portfolio"
import TrendingUp from '@material-ui/icons/TrendingUp'

export const Portfolio: AppDefinition = {
	id: "portfolio",
	title: "Portfolio",
	icon: <TrendingUp />,
	iconLarge: <TrendingUp fontSize="large" />,
	core: true,
	renderApp: PortfolioApp,
}