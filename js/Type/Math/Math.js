Math.segmentLength =
function		std_Math_segmentLength( coordFirst, coordSecond )
{
	return (Math.hypot.apply(null, [coordSecond[0] - coordFirst[0], coordSecond[1] - coordFirst[1]]));
};

Math.normalsVector =
function		std_Math_normalsVector( coordFirst, coordSecond )
{
	//~ (x',y').(dx,dy) = 0
	//~ x'.dx + y'.dy = 0
	
	//~ reffered by coordFirst.
	//~ (dy,-dx) or (-dy,dx)
	return ([[coordSecond[1] - coordFirst[1], -1 * (coordSecond[0] - coordFirst[0])], [-1 * (coordSecond[1] - coordFirst[1]), coordSecond[0] - coordFirst[0]]]);
};

Math.findPointOnStraigthLine =
function		std_Math_findPointBTWTwoOthers( coordFirst, coordSecond, lengthFromFirst )
{
	var			ratioFirstToSecond = lengthFromFirst / Math.segmentLength(coordFirst, coordSecond);
	
	return ([
			ratioFirstToSecond * (coordSecond[0] - coordFirst[0]) + coordFirst[0],
			ratioFirstToSecond * (coordSecond[1] - coordFirst[1]) + coordFirst[1],
	]);
};

Math.equiWithHeight =
function		std_Math_equiWithHeight( coordFirst, coordHeight )
{
	var			height = Math.segmentLength(coordFirst, coordHeight),
				radius = height * 2 / 3,
				t_litleH = height / 3,
				lengthSide = 2 * Math.sqrt(Math.pow(radius, 2) - Math.pow(t_litleH, 2));
	
	return (lengthSide);
	//~ var			center = findPointOnSegment(coordFirst, coordHeight, t_litleH);
	
	
};

Math.uniqID =
function		std_Math_uniqID(  )
{
	return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return (v.toString(16));}));
};