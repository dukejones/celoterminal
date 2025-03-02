import { fmtAmount } from '../../../lib/utils'
import BigNumber from 'bignumber.js'
import { savingsToCELO } from 'savingscelo'

import { coreErc20Decimals } from '../../../lib/erc20/core'
import { ubeGetAmountOut } from './utils'

import * as React from 'react'
import { Box, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import NumberInput from '../../components/number-input'
import Link from '../../components/link'

const Deposit = (props: {
	balance_CELO: BigNumber,
	ubeReserve_CELO: BigNumber,
	ubeReserve_sCELO: BigNumber,
	savingsTotal_CELO: BigNumber,
	savingsTotal_sCELO: BigNumber,
	ubeswapPoolURL: string,
	onDeposit: (toDeposit_CELO: BigNumber, cb: (e?: Error) => void) => void,
}): JSX.Element => {
	const [toDeposit, setToDeposit] = React.useState("")
	const maxToDeposit = BigNumber.maximum(
		props.balance_CELO.shiftedBy(-coreErc20Decimals).minus(0.001), 0)
	const canDeposit = maxToDeposit.gte(toDeposit)
	const handleDeposit = () => {
		props.onDeposit(
			new BigNumber(toDeposit).shiftedBy(coreErc20Decimals),
			(e?: Error) => { if (!e) { setToDeposit("") } }
		)
	}

	const toDeposit_CELO = new BigNumber(toDeposit).shiftedBy(coreErc20Decimals)
	const fromUBE_CELO = savingsToCELO(
		ubeGetAmountOut(
			toDeposit_CELO,
			props.ubeReserve_CELO, props.ubeReserve_sCELO),
		props.savingsTotal_sCELO, props.savingsTotal_CELO)
	const toReceive_CELO = BigNumber.maximum(toDeposit_CELO, fromUBE_CELO)

	return (
		<Box display="flex" flexDirection="column">
			<Alert severity="info" style={{marginBottom: 10}}>
				Deposit action automatically chooses between depositing CELO to SavingsCELO contract
				to receive equivalent value in sCELO tokens, or trading CELO for sCELO through <Link href={props.ubeswapPoolURL}>
				Ubeswap CELO+sCELO pool.</Link><br /><br />
				You are guaranteed to receive at least equivalent value of sCELO tokens, but you might also receive more
				if there is cheap sCELO available in the Ubeswap pool.
			</Alert>
			<Alert severity="warning" style={{marginBottom: 10}}>
				If you want to provide liquidity to CELO+sCELO Ubeswap pool, go to the Ubeswap
				tab directly. From there, you can safely convert portion of your CELO to
				sCELO and add liquidity to the Ubeswap pool in correct proportions, all in a single transaction.
			</Alert>
			<NumberInput
				autoFocus
				margin="normal"
				id="deposit-celo-input"
				label={`Deposit (max: ${fmtAmount(props.balance_CELO, "CELO")} CELO)`}
				helperText={!toReceive_CELO.isNaN() && `Receive ${fmtAmount(toReceive_CELO, "CELO")} CELO worth of sCELO.`}
				InputLabelProps={{shrink: true}}
				value={toDeposit}
				onChangeValue={setToDeposit}
				maxValue={maxToDeposit}
			/>
			<Button
				id="deposit"
				color="primary"
				variant="outlined"
				disabled={!canDeposit}
				onClick={handleDeposit}>Deposit</Button>
		</Box>
	)
}
export default Deposit