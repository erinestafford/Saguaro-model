function Rd3 = calc_Rd3(params)
B = params.k3*(1-(params.mub/params.omega));
newMuj = params.muj + B*params.theta_j;
newMua = params.mua + B*params.theta_a;
newPhi = 1-(params.theta_t*B/params.phi);
k4 = params.k2*newPhi;
Rd3 = (params.r1/params.mua)*(params.gamma/(params.gamma+params.muj));
end