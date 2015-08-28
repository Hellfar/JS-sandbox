function			getColorObject( s_color )
{
	var				t_matchs = s_color.match(/(^#[0-9A-Fa-f]*$)|(^rgb\((\d*), *(\d*), *(\d*)\)$)/);
	var				o_color = {hex:"#000000", rgb:"rgb(0, 0, 0)", r:0, g:0, b:0};
	
	if (t_matchs[1] != undefined)
	{
		o_color.hex = (t_matchs[1].length == 4) ? "#"+ t_matchs[1][1] + t_matchs[1][1] + t_matchs[1][2] + t_matchs[1][2] + t_matchs[1][3] + t_matchs[1][3] : t_matchs[1];
		o_color.r = parseInt(o_color.hex.substr(1, 2), 16);
		o_color.g = parseInt(o_color.hex.substr(3, 2), 16);
		o_color.b = parseInt(o_color.hex.substr(5, 2), 16);
		o_color.rgb = "rgb("+ o_color.r +", "+ o_color.g +", "+ o_color.b +")";
	}
	else if (t_matchs[2] != undefined)
	{
		o_color.rgb = t_matchs[2];
		
		o_color.r = parseInt(t_matchs[3]);
		o_color.g = parseInt(t_matchs[4]);
		o_color.b = parseInt(t_matchs[5]);

		o_color.hex = "#";
		o_color.hex += o_color.r.toString(16);
		if (o_color.hex.length == 2)
		{
			o_color.hex = o_color.hex.split("");
			o_color.hex.splice(1, 0, "0");
			o_color.hex = o_color.hex.join("");
		}
		o_color.hex += o_color.g.toString(16);
		if (o_color.hex.length == 4)
		{
			o_color.hex = o_color.hex.split("");
			o_color.hex.splice(3, 0, "0");
			o_color.hex = o_color.hex.join("");
		}
		o_color.hex += o_color.b.toString(16);
		if (o_color.hex.length == 6)
		{
			o_color.hex = o_color.hex.split("");
			o_color.hex.splice(5, 0, "0");
			o_color.hex = o_color.hex.join("");
		}
	}
	
	return (o_color);
}

function			colorDifference( COL1, COL2 )
{
	///	CEI76
	/// https://en.wikipedia.org/wiki/Color_difference#CIE76
	
	/// https://en.wikipedia.org/wiki/Lab_color_space#CIELAB-CIEXYZ_conversions
	function		LABColor( xyz )
	{
		function	f( t )
		{
			return ((t > 0.008856452) ? Math.pow(t, 0.333333333) : ((7.787037037 * t) + 0.137931034));
			
			// non-optimised
			// return ((t > pow(6 / 29, 3)) ? pow(t, 1 / 3) : ((1 / 3 * pow(29 / 6, 2) * t) + (4 / 29)));
		}
		
		return ({"L": 116 * f(xyz[1]) - 16, "A": 500 * (f(xyz[0]) - f(xyz[1])), "B": 200 * (f(xyz[1]) - f(xyz[2]))});
	}
	
	/// https://en.wikipedia.org/wiki/CIE_1931_color_space#Construction_of_the_CIE_XYZ_color_space_from_the_Wright.E2.80.93Guild_data
	function		CIEXYZ( rgb )
	{
		return ([rgb[0] * 2.768830875 + rgb[0] * 1, rgb[1] * 1.751709329 + rgb[1] * 4.590608578 + rgb[1] * 0.565067526, rgb[2] * 1.130135051 + rgb[2] * 0.060066678 + rgb[2] * 5.594168503]);
	}
	
	var				LAB1 = LABColor(CIEXYZ([parseInt(COL1.substr(0, 2), 16), parseInt(COL1.substr(2, 2), 16), parseInt(COL1.substr(4, 2), 16)]));
	var				LAB2 = LABColor(CIEXYZ([parseInt(COL2.substr(0, 2), 16), parseInt(COL2.substr(2, 2), 16), parseInt(COL2.substr(4, 2), 16)]));
	
	return (Math.sqrt(Math.pow((LAB2.L - LAB1.L), 2) + Math.pow((LAB2.A - LAB1.A), 2) + Math.pow((LAB2.B - LAB1.B), 2)));
}
