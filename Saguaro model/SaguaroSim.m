clear all; close all;
%% Params
s_j0 = 200;
s_a0 = 150;
t0 = 300;
b0 = 1000;
param_struct= ...
{'r1',4.725;%
'k1', 250;%fixed
'b',.8;%fixed
'gamma', 1/35;%fixed
'phi',.07;%
'k2',(565+1350)/2;%fixed
'muj', .042; %
'mua',1/140;%fixed
'alpha1', .000001;%fixed
'rho',(1/(80-35))*(1/100)*.8;%
'e', .113;%fixed
'omega',.35; %focus on this param down for sensitivity
'k3', 60000; %fixed
'mub',1/3;%vary
'theta_j', 1/(1111*250*(1-.01));%vary (mortality of species)/(min buffel pop)( fire frequency)
'theta_a', 0.65/(1111*250*(1-.01));%vary
'theta_t', 0.5/(1111*250*(1-.01));%vary
}';
params = struct(param_struct{:});

%% Simulations
% original
 y0 = [s_j0 s_a0 t0];
 tspan = [0 300];
 fn = @(t,y)basicLifeCycle(t,y,params);
 [T,Y] = ode23s(fn, tspan, y0);
 plot(T,Y(:,1),'b','LineWidth', 2);
 hold on
 plot(T,Y(:,2),'r','LineWidth', 2);
 plot(T,Y(:,3),'y','LineWidth', 2);
 xlabel('Time in Years');
 ylabel('Population')
 legend('S_j','S_a','T')

%% varying params
% params.alpha2 = 1/25;
%  fn = @(t,y)basicLifeCycle(t,y,params);
%  [T,Y] = ode23s(fn, tspan, y0);
%  plot(T,Y(:,1),'b--','LineWidth', 2);
%  plot(T,Y(:,2),'r--','LineWidth', 2);
%  plot(T,Y(:,3),'y--','LineWidth', 2);
%  
%  params.alpha2 = 1/200;
%  fn = @(t,y)basicLifeCycle(t,y,params);
%  [T,Y] = ode23s(fn, tspan, y0);
%  plot(T,Y(:,1),'b*-','LineWidth', 2);
%  plot(T,Y(:,2),'r*-','LineWidth', 2);
%  plot(T,Y(:,3),'y*-','LineWidth', 2);
% 
% 
% legend('S_j','S_a','T','S_j25yr','S_a25yr','T25yr', 'S_j200yr','S_a200yr','T_200yr')


%% Seasonality
%  y0 = [s_j0 s_a0 t0];
%  tspan = [0 300];
%  fn = @(t,y)basicLifeCycleSeasonality(t,y,params);
%  [T,Y] = ode23s(fn, tspan, y0);
%  figure()
%  plot(T,Y(:,1),'LineWidth', 2);
%  hold on
%  plot(T,Y(:,2),'LineWidth', 2);
%  plot(T,Y(:,3),'LineWidth', 2);
%  xlabel('Time in Years');
%  ylabel('Population')
%  legend('S_j','S_a','T')
%% vary params
%  y0 = [s_j0 s_a0 t0];
%  tspan = [0 150];
%  %baseline
%  fn = @(t,y)basicLifeCycleSeasonality(t,y,params);
%  [T,Y] = ode23s(fn, tspan, y0);
%  figure()
%  plot(T,Y(:,1),'b','LineWidth', 2);
%  hold on
%  plot(T,Y(:,2),'r','LineWidth', 2);
%  plot(T,Y(:,3),'y','LineWidth', 2);
%  xlabel('Time in Years');
%  ylabel('Population')
%  
%  params.r1 =0.5;
%  fn = @(t,y)basicLifeCycleSeasonality(t,y,params);
%  [T,Y] = ode23s(fn, tspan, y0);
%  plot(T,Y(:,1),'c','LineWidth', 2);
%  plot(T,Y(:,2),'g','LineWidth', 2);
%  plot(T,Y(:,3),'k','LineWidth', 2);
%  
%  params.r1 =0.001;
%  fn = @(t,y)basicLifeCycleSeasonality(t,y,params);
%  [T,Y] = ode23s(fn, tspan, y0);
%  plot(T,Y(:,1),'m','LineWidth', 2);
%  plot(T,Y(:,2),'LineWidth', 2);
%  plot(T,Y(:,3),'LineWidth', 2);
% 
%  legend('S_j','S_a','T','S_j, r=0.5','S_a, r=0.5','T, r=0.5', 'S_j, r=0.001','S_a, r=0.001','T, r=0.001')
%% buffelgrass
%  y0 = [s_j0 s_a0 t0 b0];
%  tspan = [0 300];
%  fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%  [T,Y] = ode23s(fn, tspan, y0);
%  figure('DefaultAxesFontSize', 12)
%   plot(T,Y(:,1),'LineWidth', 2);
%   hold on
%   plot(T,Y(:,2),'LineWidth', 2);
%   plot(T,Y(:,3),'LineWidth', 2);
%  %plot(T,Y(:,4),'LineWidth',2);
%  xlabel('Time in Years');
%  ylabel('Population')
% legend('S_j','S_a','T')
%% Sensitivity Analysis
% Q1 = @(param)Q1_Sa (param,y0, T);
% sensitivity_mua_a  = sensitivity_analysis(Q1,params,'mua');
% Q1 = @(param)Q1_Sa (param,y0, T);
% sensitivity_muj_a  = sensitivity_analysis(Q1,params,'muj');
% 
% Q2 = @(param)Q2_Sj (param,y0, T);
% sensitivity_mua_j  = sensitivity_analysis(Q2,params,'mua');
% Q2 = @(param)Q2_Sj (param,y0, T);
% sensitivity_muj_j  = sensitivity_analysis(Q2,params,'muj');
% 
% Q3 = @(param)Q3_T (param,y0, T);
% sensitivity_mua_t  = sensitivity_analysis(Q3,params,'mua');
% Q3 = @(param)Q3_T (param,y0, T);
% sensitivity_muj_t  = sensitivity_analysis(Q3,params,'muj');
% 
% figure()
% plot_sensitivity(Q1,'mua',[0.2:.01:0.8],params)
% title('mu_a w.r.t. S_a')