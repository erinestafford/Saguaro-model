function g = calc_muj(t, params)
g = (params.muj)*cos(3.15*t).^(14) + params.muj;
end