clear all; close all;
%% Params
s_j0 = 2000;
s_a0 = 100;
t0 = 1500;
param_struct= ...
{'r1',.05;
'k1', 3000;
'b',.95;
'gamma', 1/35;
'phi',0.005;
'A',1000;
'muj', 0.005;
'mua',1/145;
'alpha1', .000001;
'alpha2',0.85;
}';
params = struct(param_struct{:});

%% Simulation
 y0 = [s_j0 s_a0 t0];
 tspan = [0 500];
 fn = @(t,y)basicLifeCycle(t,y,params);
 [T,Y] = ode23s(fn, tspan, y0);
 figure('DefaultAxesFontSize', 12)
 plot(T,Y(:,1),'LineWidth', 2);
 hold on
 plot(T,Y(:,2),'LineWidth', 2);
 plot(T,Y(:,3),'LineWidth', 2);
 xlabel('Time in Years');
 ylabel('Population')
legend('S_j','S_a','T')