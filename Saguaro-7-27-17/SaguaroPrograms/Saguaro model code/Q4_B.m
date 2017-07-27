function [B] = Q4_B (params, output, time)
fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params);
[T,Y] = ode23s(fn,time,output);
B = Y(end,4);
end