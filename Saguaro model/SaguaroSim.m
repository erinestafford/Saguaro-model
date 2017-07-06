%% Params
s_j0 = 400;
s_a0 = 100;
t0 = 600;
params_struct= ...
{'r1',.005;
'k1', 3000;
'b',.75;
'gamma', 1/35;
'c', .00001;
'phi',.993;
'A',1000;
'muj', 0.005;
'mua',1/145;
'alpha1', .6;
'alpha2',0.95;
}';
params = struct(param_struct{:});

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