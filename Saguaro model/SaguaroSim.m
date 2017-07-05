%% Params
s_j0 = 400;
s_a0 = 1000;
t0 = 600;
params= struct('phi',300,'delta', .85,'gamma',1/35, 'beta', 1/145, 'b', .01, 'd', 1/150,'k',.05, 'c', .02);
%phi is seeds that are germinated per year
%delta is the natural death rate of the young saguaros without the
%protection of host trees
%% Simulation
 y0 = [s_j0 s_a0 t0];
 tspan = [0 20];
 fn = @(t,y)basicLifeCycle(t,y,params);
 [T,Y] = ode45(fn, tspan, y0);
 figure('DefaultAxesFontSize', 12)
 plot(T,Y(:,1),'LineWidth', 2);
 hold on
 plot(T,Y(:,2),'LineWidth', 2);
 plot(T,Y(:,3),'LineWidth', 2);
 xlabel('Time in Years');
 ylabel('Population')
legend('S_j','S_a','T')