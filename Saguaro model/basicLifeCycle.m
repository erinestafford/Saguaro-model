function pops = basicLifeCycle(t,y,params)
pops(1) = params.r1*y(2)*(1-(y(2)/params.k1+params.b*y(3))) - params.gamma*y(1) - params.muj*y(1);
pops(2) = params.gamma*y(1) - params.alpha1*y(3)*params.r2/params.k2 - params.mua*y(2);
pops(3) = params.r3*y(3)*((params.k3-y(3)-params.alpha2*y(2))/params.k3) - params.mut * y(3);
pops=pops';
end