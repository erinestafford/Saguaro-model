function [S_a] = Q1_Sa (params, out, t)
fn = @(t,y)basicLifeCycle(t,y,params);
[time,output] = ode23s(fn,t , out);
S_a = output(end,2);

end