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
'theta_j',1/(1111*250*(1-.0027));%vary (mortality of species)/(min buffel pop)( fire frequency)
'theta_a', 0.7/(1111*250*(1-.0027));%vary
'theta_t', 0.63/(1111*250*(1-.0027));%vary
}';
params = struct(param_struct{:});

%% Simulations
% original
 y0 = [s_j0 s_a0 t0];
 tspan = [0 300];
 fn = @(t,y)basicLifeCycle(t,y,params);
 [T,Y] = ode23s(fn, tspan, y0);
%  subplot(1,2,1)
%  plot(T,Y(:,1),'LineWidth', 2);
%  hold on
%  plot(T,Y(:,2),'LineWidth', 2);
%  plot(T,Y(:,3),'LineWidth', 2);
%  xlabel('Time in Years');
%  ylabel('Population')
%  legend('S_j','S_a','T')

%% Seasonality
%  y0 = [s_j0 s_a0 t0];
%  tspan = [0 300];
%  fn = @(t,y)basicLifeCycleSeasonality(t,y,params);
%  [T,Y] = ode23s(fn, tspan, y0);
%  subplot(1,2,2)
%  plot(T,Y(:,1),'LineWidth', 2);
%  hold on
%  plot(T,Y(:,2),'LineWidth', 2);
%  plot(T,Y(:,3),'LineWidth', 2);
%  xlabel('Time in Years');
%  ylabel('Population')
%  legend('S_j','S_a','T')
%% vary params - r wrt equilibrium
% figure()
%  y0 = [s_j0 s_a0 t0];
%  tspan = [0 400];
%  rVals = .1:.1:5;
% for i= 1:length(rVals)
%     params.r1 = rVals(i);
%     fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(:,i) = Y(end,:);
% end
% plot(rVals,y, 'LineWidth', 2);
% xlabel('r values');
% ylabel('populations at equilbria')
% title('Vary r')
% legend('S_j','S_a','T')

%% vary params - r, pops wrt time
% figure()
% y0 = [s_j0 s_a0 t0];
%  tspan = [0 300];
%  fn = @(t,y)basicLifeCycle(t,y,params);
%  [T,Y] = ode23s(fn, tspan, y0);
%  y0 = [s_j0 s_a0 t0];
%  tspan = [0 400];
%  rVals = .1:.5:7;
%  subplot(1,3,1)
% for i= 1:length(rVals)
%     params.r1 = rVals(i);
%     fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     plot(T,Y(:,1),'LineWidth', 2)
%     ylabel('S_j at equilbria')
%     title('Vary r')
%     hold on 
% end
% params.r1 = 4.725;
% fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
% [T,Y] = ode23s(fn, tspan, y0);
% plot(T,Y(:,1),'*-b','LineWidth', 2)
% 
%  subplot(1,3,2)
% for i= 1:length(rVals)
%     params.r1 = rVals(i);
%     fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     plot(T,Y(:,2),'LineWidth', 2)
%     ylabel('S_a at equilbria')
%     title('Vary r')
%     hold on 
% end
% params.r1 = 4.725
% fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
% [T,Y] = ode23s(fn, tspan, y0);
% plot(T,Y(:,2),'*-b','LineWidth', 2)
%  subplot(1,3,3)
% for i= 1:length(rVals)
%     params.r1 = rVals(i);
%     fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     plot(T,Y(:,3),'LineWidth', 2)
%     ylabel('T at equilbria')
%     title('Vary r')
%     hold on 
% end
% params.r1 = 4.725
% fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
% [T,Y] = ode23s(fn, tspan, y0);
% plot(T,Y(:,3),'*-b','LineWidth', 2)
%% vary params - phi
%  y0 = [s_j0 s_a0 t0];
%  tspan = [0 400];
%  phiVals = .001:.001:.3;
% for i= 1:length(phiVals)
%     params.phi = phiVals(i);
%     fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(:,i) = Y(end,:);
% end
% figure()
% plot(phiVals,y, 'LineWidth', 2);
% xlabel('phi values');
% ylabel('populations at equilbria')
% legend('S_j','S_a','T')
% title('Vary phi')
%% Vary phi - pops wrt time
% figure()
%  y0 = [s_j0 s_a0 t0];
%  tspan = [0 400];
%  phiVals = .01:.05:.5;
%  subplot(1,3,1)
% for i= 1:length(phiVals)
%     params.phi = phiVals(i);
%     fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     plot(T,Y(:,1),'LineWidth', 2)
%     ylabel('S_j at equilbria')
%     title('Vary phi')
%     hold on 
% end
% params.phi = .07;
% fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
% [T,Y] = ode23s(fn, tspan, y0);
% plot(T,Y(:,1),'*-b','LineWidth', 2)
%  subplot(1,3,2)
% for i= 1:length(phiVals)
%     params.phi = phiVals(i);
%     fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     plot(T,Y(:,2),'LineWidth', 2)
%     ylabel('S_a at equilbria')
%     title('Vary phi')
%     hold on 
% end
% params.phi = .07;
% fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
% [T,Y] = ode23s(fn, tspan, y0);
% plot(T,Y(:,2),'*-b','LineWidth', 2)
%  subplot(1,3,3)
% for i= 1:length(phiVals)
%     params.phi = phiVals(i);
%     fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     plot(T,Y(:,3),'LineWidth', 2)
%     ylabel('T at equilbria')
%     title('Vary phi')
%     hold on 
% end
% params.phi = .07;
% fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
% [T,Y] = ode23s(fn, tspan, y0);
% plot(T,Y(:,3),'*-b','LineWidth', 2)
%% buffelgrass
 y0 = [s_j0 s_a0 t0 b0];
 tspan = [0 400];
%  fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%  [T,Y] = ode23s(fn, tspan, y0);
% % subplot(1,2,1)
%   plot(T,Y(:,1),'LineWidth', 2);
%   hold on
%   plot(T,Y(:,2),'LineWidth', 2);
%   plot(T,Y(:,3),'LineWidth', 2);
%   %plot(T,Y(:,4),'LineWidth',2);
%  xlabel('Time in Years');
%  ylabel('Population')
%% Testing different initial condidtions - equilibrium is the same
% hold on
% y0 = [150 200 300 60000];
% tspan = [0 400];
%  fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%  [T,Y] = ode23s(fn, tspan, y0);
%   plot(T,Y(:,1),'LineWidth', 2);
%   hold on
%   plot(T,Y(:,2),'LineWidth', 2);
%   plot(T,Y(:,3),'LineWidth', 2);
%  xlabel('Time in Years');
%  ylabel('Population')
% legend('S_j1','S_a1','T1', 'S_j2','S_a2','T2')
%% Vary Buffel params - theta
%vary theta

%thetaVals = 0:.0000001:.005;
% subplot(1,3,1)
% for i= 1:length(thetaVals)
%     params.theta_j = thetaVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, yinit);
%     y1(i) = Y(end,1);
% end
% plot(thetaVals,y1,'LineWidth', 2);
% xlabel('Value of \theta_j');
% ylabel('Juvenile Saguaro Final Population');
% 
% subplot(1,3,2)
% for i= 1:length(thetaVals)
%     params.theta_j = thetaVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, yinit);
%     y2(i) = Y(end,2);
% end
% plot(thetaVals,y2,'LineWidth', 2);
% xlabel('Value of \theta_j');
% ylabel('Adult Saguaro Final Population');
% title('Effects of Varying \theta_j from 0 to 0.005')
% 
% subplot(1,3,3)
% 
% for i= 1:length(thetaVals)
%     params.theta_j = thetaVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     y3(i) = Y(end,3);
%     [T,Y] = ode23s(fn, tspan, yinit);
% end
% plot(thetaVals,y3,'LineWidth', 2);
% xlabel('Value of \theta_j');
% ylabel('Palo Verde Final Population');
% 
% figure()
% plot(T,Y);
% legend();
%% Vary buffel grass growth

% omegaVals = 0:.01:3;
% subplot(1,3,1)
% for i= 1:length(omegaVals)
%     params.omega = omegaVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,1);
% end
% plot(omegaVals,y,'LineWidth', 2);
% xlabel('Value of \omega');
% ylabel('Juvenile Saguaro Popualtion');
% 
% subplot(1,3,2)
% for i= 1:length(omegaVals)
%     params.omega = omegaVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,2);
% end
% plot(omegaVals,y,'LineWidth', 2);
% xlabel('Value of \omega');
% ylabel('Adult Saguaro Popualtion');
% title('Effects of Varying \omega from 0 to 3');
% 
% subplot(1,3,3)
% for i= 1:length(omegaVals)
%     params.omega = omegaVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,3);
% end
% plot(omegaVals,y,'LineWidth', 2);
% xlabel('Value of \omega');
% ylabel('Palo Verde Popualtion');

%Vary harvesting
% mubVals = 0:(1/50):(1/2);
% params.mub = 1/3;
% subplot(1,3,1)
% for i= 1:length(mubVals)
%     params.mub = mubVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,1);
% end
% plot(mubVals,y,'LineWidth', 2);
% ylabel('Juvenile Saguaro Popualtion');
% xlabel('Value of \mu_B');
% 
% params.mub = 1/3;
% subplot(1,3,2)
% for i= 1:length(mubVals)
%     params.mub = mubVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,2);
% end
% plot(mubVals,y,'LineWidth', 2);
% title('Effects of Varying \mu_b from 0 to 1/2');
% ylabel('Adult Saguaro Popualtion');
% xlabel('Value of \mu_B');
% 
% params.mub = 1/3;
% subplot(1,3,3)
% for i= 1:length(mubVals)
%     params.mub = mubVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,3);
% end
% plot(mubVals,y,'LineWidth', 2);
% xlabel('Value of \mu_B');
% ylabel('Palo Verde Popualtion');

%% Vary B0
% B0vals = 0:500:60000;
% subplot(1,3,1)
% for i= 1:length(B0vals)
%     y0 = [s_j0 s_a0 t0 B0vals(i)];
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,1);
% end
% plot(B0vals,y,'LineWidth', 2);
% ylabel('Juvenile Saguaro Popualtion');
% xlabel('Value of B0');
% 
% subplot(1,3,2)
% for i= 1:length(B0vals)
%     y0 = [s_j0 s_a0 t0 B0vals(i)];
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,2);
% end
% plot(B0vals,y,'LineWidth', 2);
% title('Effects of Varying B0 from 0 to 60000');
% ylabel('Adult Saguaro Popualtion');
% xlabel('Value of B0');
% 
% subplot(1,3,3)
% for i= 1:length(B0vals)
%     y0 = [s_j0 s_a0 t0 B0vals(i)];
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,3);
% end
% plot(B0vals,y,'LineWidth', 2);
% xlabel('Value of B0');
% ylabel('Palo Verde Popualtion');
%% Buffelgrass Simulations
%  y0 = [s_j0 s_a0 t0 b0];
%  tspan = [0 500];
%  fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%  [T,Y] = ode23s(fn, tspan, y0);
%  plot(T,Y(:,4),'LineWidth',2);
%  xlabel('Time in Years');
%  ylabel('Buffelgrass Population')
%  hold on 
 %increase mu_b harvesting
%  params.mub = 1/3 + .01/3;
%  fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%  [T,Y] = ode23s(fn, tspan, y0);
%  plot(T,Y(:,4),'LineWidth',2);
%  Q4 = @(param)Q4_B (param,yinit, T);
%  sensitivity_mub  = sensitivity_analysis(Q4,params,'mub')

%  params.mub = 1/3;
%  params.omega = params.omega - params.omega*.01;
%  fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%  [T,Y] = ode23s(fn, tspan, y0);
%  plot(T,Y(:,4),'LineWidth',2);
%  Q4 = @(param)Q4_B (param,y0, T);
%  sensitivity_omega  = sensitivity_analysis(Q4,params,'omega')
 
%  legend('baseline', 'increase \mu_B', 'decrease omega')
 
%% Sensitivity Analysis
Q1 = @(param)Q1_Sa (param,y0, T);
% sensitivity_thetaj_a  = sensitivity_analysis(Q1,params,'theta_j')
% sensitivity_thetaa_a  = sensitivity_analysis(Q1,params,'theta_a')
% sensitivity_thetat_a  = sensitivity_analysis(Q1,params,'theta_t')
% sensitivity_mub_a  = sensitivity_analysis(Q1,params,'mub')
% sensitivity_omega_a  = sensitivity_analysis(Q1,params,'omega')
% sensitivity_r1_a  = sensitivity_analysis(Q1,params,'r1') 
% sensitivity_rho_a  = sensitivity_analysis(Q1,params,'rho')
% sensitivity_phi_a  = sensitivity_analysis(Q1,params,'phi')
% sensitivity_b_a  = sensitivity_analysis(Q1,params,'b')

Q2 = @(param)Q2_Sj (param,y0, T);
% sensitivity_thetaj_j  = sensitivity_analysis(Q2,params,'theta_j')
% sensitivity_thetaa_j  = sensitivity_analysis(Q2,params,'theta_a')
% sensitivity_thetat_j  = sensitivity_analysis(Q2,params,'theta_t')
% sensitivity_mub_j  = sensitivity_analysis(Q2,params,'mub')
% sensitivity_omega_j  = sensitivity_analysis(Q2,params,'omega')
% sensitivity_r1_j  = sensitivity_analysis(Q2,params,'r1') 
% sensitivity_rho_j  = sensitivity_analysis(Q2,params,'rho')
% sensitivity_phi_j  = sensitivity_analysis(Q2,params,'phi')
% sensitivity_b_j  = sensitivity_analysis(Q2,params,'b')

Q3 = @(param)Q3_T (param,y0, T);
% sensitivity_thetaj_t  = sensitivity_analysis(Q3,params,'theta_j')
% sensitivity_thetaa_t  = sensitivity_analysis(Q3,params,'theta_a')
% sensitivity_thetat_t  = sensitivity_analysis(Q3,params,'theta_t')
% sensitivity_mub_t  = sensitivity_analysis(Q3,params,'mub')
% sensitivity_omega_t  = sensitivity_analysis(Q3,params,'omega')
% sensitivity_r1_t  = sensitivity_analysis(Q3,params,'r1') 
% sensitivity_rho_t  = sensitivity_analysis(Q3,params,'rho')
% sensitivity_phi_t  = sensitivity_analysis(Q3,params,'phi')
% sensitivity_b_t  = sensitivity_analysis(Q3,params,'b')

Q4 = @(param)Q4_B(param,y0,T);
% sens_mub = sensitivity_analysis(Q4,params,'mub')
% sens_omega = sensitivity_analysis(Q4,params,'omega')

figure()
subplot(1,3,1)
plot_sensitivity(Q2,'theta_j',0.0000001:.0000001:.0005,params)
hold on
plot_sensitivity(Q1,'theta_j',0.0000001:.0000001:.0005,params)
plot_sensitivity(Q3,'theta_j',0.0000001:.0000001:.0005,params)
title('Change in Population w.r.t. \theta_j')
subplot(1,3,2)
plot_sensitivity(Q2,'theta_a',0.0000001:.0000001:.0005,params)
hold on
plot_sensitivity(Q1,'theta_a',0.0000001:.0000001:.0005,params)
plot_sensitivity(Q3,'theta_a',0.0000001:.0000001:.0005,params)
title('Change in Population w.r.t. \theta_a')
subplot(1,3,3)
plot_sensitivity(Q2,'theta_t',0.0000001:.0000001:.0005,params)
hold on
plot_sensitivity(Q1,'theta_t',0.0000001:.0000001:.0005,params)
plot_sensitivity(Q3,'theta_t',0.0000001:.0000001:.0005,params)
title('Change in Population w.r.t. \theta_t')

% figure()
% contour_plot(Q2,params, linspace(0,3,40), linspace(0,.5,40),'omega','theta_j');

