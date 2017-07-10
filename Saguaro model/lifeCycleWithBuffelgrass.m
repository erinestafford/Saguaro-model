function pops = lifeCycleWithBuffelgrass(t,y,params)
pops(1) = max(0,params.r1*y(2)*(1-((params.e*y(1)+y(2))/(params.k1+params.b*y(3))))) - (params.gamma+ params.muj+params.theta_j*y(4))*y(1);
pops(2) = params.gamma*y(1) - (params.mua+params.theta_a*y(4))*y(2)- (params.alpha1/params.k2) * y(2) * y(3);
pops(3) = params.phi * y(3)*(1 - (params.alpha2 * y(2) + y(3))/params.k2) - params.theta_t*y(4)*y(3);
pops(4) = params.omega*y(4)*(1-(y(4)/params.k3))-params.mub*y(4);
pops=pops';
end