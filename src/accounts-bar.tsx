import * as React from 'react'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { Account } from './state/accounts-state'

const AccountsBar = (props: {
	accounts: Account[],
	selectedAccount: Account,
	setSelectedAccount: (a: Account) => void,
}): JSX.Element => {
	return (
		<div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
			<Select
				value={props.selectedAccount.address}
				onChange={(event) => {
					const selected = props.accounts.find((a) => a.address === event.target.value)
					if (selected) {
						props.setSelectedAccount(selected)
					}
				}}>
				{
					props.accounts.map((a) => (
						<MenuItem value={a.address} key={a.address}>
							{`${a.name}: ${a.address.slice(0,6)}...${a.address.slice(a.address.length-4)}`}
						</MenuItem>
					))
				}
			</Select>
		</div>
	)
}

export default AccountsBar