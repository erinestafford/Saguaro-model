function pops = basicLifeCycleSeasonality(t,y,params)
pops(1) = max(0,calc_r1(t)*y(2)*(1-((params.e*y(1)+y(2))/(params.k1+params.b*y(3))))) - params.gamma*y(1) - calc_muj(t)*y(1);
pops(2) = params.gamma*y(1) - calc_mua(t)*y(2)- (params.alpha1/params.k2) * y(2) * y(3);
pops(3) = params.phi * y(3)*(1 - (params.alpha2 * y(2) + y(3))/params.k2);
pops=pops';
end