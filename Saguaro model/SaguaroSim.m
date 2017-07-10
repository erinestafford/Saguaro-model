clear all; close all;
%% Params
s_j0 = 200;
s_a0 = 800;
t0 = 500;
b0 = 800;
space = 10000; %1 hectare, in meters
param_struct= ...
{'r1',4.725;%make function of time?
'k1', 165;
'b',1;
'gamma', 1/35;
'phi',0.012;
'k2',435;
'muj', .042;
'mua',1/140;
'alpha1', .000001;
'alpha2',1/100;
'e', .113;
'omega',.4*(100)-(1/20);
'k3', 119599; %max density per hectare
'mub',1/3;
'theta_j', 0.95/(5000*200);
'theta_a', 0.95/(5000*200);
'theta_t', 0.75/(5000*200);
'theta_b', 0.0005/(5000*200);
}';
params = struct(param_struct{:});

%% Simulations
%  y0 = [s_j0 s_a0 t0];
%  tspan = [0 400];
%  fn = @(t,y)basicLifeCycle(t,y,params);
%  [T,Y] = ode23s(fn, tspan, y0);
%  figure('DefaultAxesFontSize', 12)
%  plot(T,Y(:,1),'LineWidth', 2);
%  hold on
%  plot(T,Y(:,2),'LineWidth', 2);
%  plot(T,Y(:,3),'LineWidth', 2);
%  xlabel('Time in Years');
%  ylabel('Population')
% legend('S_j','S_a','T')
% 
%  y0 = [s_j0 s_a0 t0];
%  tspan = [0 400];
%  fn = @(t,y)basicLifeCycleSeasonality(t,y,params);
%  [T,Y] = ode23s(fn, tspan, y0);
%  figure('DefaultAxesFontSize', 12)
%  plot(T,Y(:,1),'LineWidth', 2);
%  hold on
%  plot(T,Y(:,2),'LineWidth', 2);
%  plot(T,Y(:,3),'LineWidth', 2);
%  xlabel('Time in Years');
%  ylabel('Population')
% legend('S_j','S_a','T')

 y0 = [s_j0 s_a0 t0 b0];
 tspan = [0 100];
 fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params);
 [T,Y] = ode23s(fn, tspan, y0);
 figure('DefaultAxesFontSize', 12)
  plot(T,Y(:,1),'LineWidth', 2);
  hold on
  plot(T,Y(:,2),'LineWidth', 2);
  plot(T,Y(:,3),'LineWidth', 2);
 %plot(T,Y(:,4),'LineWidth',2);
 xlabel('Time in Years');
 ylabel('Population')
legend('S_j','S_a','T')
%% Sensitivity Analysis
% Q1 = @(param)Q1_Sa (param,y0, T);
% sensitivity_mua  = sensitivity_analysis(Q1,params,'mua')
% Q1 = @(param)Q1_Sa (param,y0, T);
% sensitivity_muj  = sensitivity_analysis(Q1,params,'muj')
% 
% Q2 = @(param)Q2_Sj (param,y0, T);
% sensitivity_mua  = sensitivity_analysis(Q2,params,'mua')
% Q2 = @(param)Q1_Sj (param,y0, T);
% sensitivity_muj  = sensitivity_analysis(Q2,params,'muj')
