function pops = basicLifeCycle(t,y,params)
pops(1) = params.phi*y(2) - params.gamma*y(1) - (params.delta*y(1)/(1+y(3)));
pops(2) = params.gamma*y(1) - params.beta*y(2);
pops(3) = params.b*y(3) - params.d*y(3) - (params.k *y(2)+params.c*y(3))*y(3)/params.k;
pops=pops';
end