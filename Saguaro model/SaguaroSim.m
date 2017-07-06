%% Params
s_j0 = 400;
s_a0 = 100;
t0 = 600;
params= struct('r1',.005,'k1', 3000,'b',.75, 'gamma', 1/35, 'alpha1', .00001,'r2',.993,'k2',1000, 'muj', 0.005,'mua',1/145,'r3',0.75,'k3',3000,'alpha2',0.95,'mut',1/150);
%phi is seeds that are germinated per year
%delta is the natural death rate of the young saguaros without the
%protection of host trees
%% Simulation
 y0 = [s_j0 s_a0 t0];
 tspan = [0 200];
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