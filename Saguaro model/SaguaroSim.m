clear all; close all;
%% Params
s_j0 = 300;
s_a0 = 1100;
t0 = 1000;
space = 10000; %1 hectare, in meters
param_struct= ...
{'r1',4.725;%make function of time?
'k1', 697.575;
'b',.85;
'gamma', 1/35;
'phi',0.012;
'k2',1000;
'muj', .25;
'mua',1/140;
'alpha1', .000001;
'alpha2',0.95;
'e', .113;
}';
params = struct(param_struct{:});

%% Simulation
 y0 = [s_j0 s_a0 t0];
 tspan = [0 400];
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