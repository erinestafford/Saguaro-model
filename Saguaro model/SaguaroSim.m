%% Params
params= struct('phi', 0.1,'sigma', .65,'gamma',1/35, 'beta', 1/175, 'b', .01, 'd', 1/5,'k',.05, 'c', .02);

s_j0 = 4;
s_a0 = 10;
t0 = 6;

%% Simulation
 y0 = [s_j0 s_a0 t0];
 tspan = [0:10:200];
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
