function Rd4 = calc_Rd4(params)
B = params.k3*(1-(params.mub/params.omega));
newMuj = params.muj + B*params.theta_j;
newMua = params.mua + B*params.theta_a;
newPhi = params.phi*(1-(params.theta_t*B/params.phi));
k4 = params.k2*(1-(params.theta_t*B/newPhi));
newAlpha1 = newPhi*params.alpha1;
Rd4 = (params.r1/(newMua+newAlpha1))*(params.gamma/(params.gamma+newMuj));
end