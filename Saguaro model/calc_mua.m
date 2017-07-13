function g = calc_mua(t, params)
g = (params.muj)*cos(3.15*t).^(14) + params.mua;
end