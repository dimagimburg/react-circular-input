import React, { SVGProps } from 'react'
import { useInputContext } from './'
import {
	calculateNearestValueToPoint,
	absPos,
	getElementPosition,
	Coordinates,
} from './utils'

const defaultProps = {
	stroke: '#CEE0F5',
	fill: 'none',
	strokeWidth: 20,
	strokeLinecap: 'round',
}

export const Track = ({
	strokeWidth,
	...props
}: SVGProps<SVGCircleElement>) => {
	const { value, radius, center, containerRef, onChange } = useInputContext()

	return (
		<>
			<circle
				strokeWidth={strokeWidth}
				{...props}
				cx={center.x}
				cy={center.y}
				r={radius}
			/>

			{/* event catcher (invisible and slightly wider than track) */}
			{onChange && (
				<circle
					{...props}
					cx={center.x}
					cy={center.y}
					r={radius}
					strokeWidth={parseFloat(strokeWidth as string) * 2}
					strokeOpacity={0}
					onClick={e => {
						const nearestValue = calculateNearestValueToPoint({
							center,
							container: getElementPosition(
								containerRef.current
							) as Coordinates,
							point: absPos(e),
							radius,
							value,
						})
						onChange(nearestValue)
					}}
				/>
			)}
		</>
	)
}

Track.defaultProps = defaultProps