function pops = basicLifeCycle(t,y,params)

pops(1) = params.r1*y(2)*(1-(y(2)/(params.k1+params.b*y(3)))) - params.gamma*y(1) - params.muj*y(1);
pops(2) = params.gamma*y(1) - params.mua*y(2)- (params.alpha1/params.A) * y(2) * y(3);
pops(3) = params.phi * y(3)*(1 - (params.alpha2 * y(2) + y(3))/params.A);
pops=pops';
end